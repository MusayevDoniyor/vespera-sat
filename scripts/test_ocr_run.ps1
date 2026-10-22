$runtime = [System.IO.Path]::Combine([System.Runtime.InteropServices.RuntimeEnvironment]::GetRuntimeDirectory(), "System.Runtime.WindowsRuntime.dll")
Add-Type -Path $runtime

[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

function Await($asyncOp) {
    $asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | 
        Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.IsGenericMethod } | 
        Select-Object -First 1
    
    # Check if generic or non-generic
    if ($asyncOp.GetType().GetInterfaces() -match 'IAsyncOperationWithProgress`2|IAsyncOperation`1') {
        $returnType = $asyncOp.GetType().GetGenericArguments()[0]
        $asTask = $asTaskGeneric.MakeGenericMethod($returnType)
        $netTask = $asTask.Invoke($null, @($asyncOp))
    } else {
        $asTaskNonGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | 
            Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and -not $_.IsGenericMethod } | 
            Select-Object -First 1
        $netTask = $asTaskNonGeneric.Invoke($null, @($asyncOp))
    }
    return $netTask.GetAwaiter().GetResult()
}

$sample = "C:\dev\vespera\scripts\extracted_june_samples\page_001.png"
$file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($sample))
$stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read))
$decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream))
$bitmap = Await ($decoder.GetSoftwareBitmapAsync())
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
$ocrResult = Await ($engine.RecognizeAsync($bitmap))

Write-Host "=== OCR EXTRACTED TEXT ==="
Write-Host $ocrResult.Text
Write-Host "=== LINES COUNT: $($ocrResult.Lines.Count) ==="
foreach ($line in $ocrResult.Lines) {
    Write-Host "LINE: $($line.Text)"
}
