[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

function Run-Ocr([string]$imagePath) {
    $fileTask = [Windows.Storage.StorageFile]::GetFileFromPathAsync($imagePath)
    $file = $fileTask.GetAwaiter().GetResult()
    
    $streamTask = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
    $stream = $streamTask.GetAwaiter().GetResult()
    
    $decoderTask = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
    $decoder = $decoderTask.GetAwaiter().GetResult()
    
    $bitmapTask = $decoder.GetSoftwareBitmapAsync()
    $softwareBitmap = $bitmapTask.GetAwaiter().GetResult()
    
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    $ocrTask = $engine.RecognizeAsync($softwareBitmap)
    $result = $ocrTask.GetAwaiter().GetResult()
    return $result.Text
}

$sample = "C:\dev\vespera\scripts\extracted_june_samples\page_001.png"
$text = Run-Ocr $sample
Write-Host "--- OCR Result for Page 1 ---"
Write-Host $text
