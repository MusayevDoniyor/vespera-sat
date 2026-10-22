Add-Type -AssemblyName System.Drawing
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($engine) {
    Write-Host "WinRT OCR is available! Language: $($engine.RecognizerLanguage.DisplayName)"
} else {
    Write-Host "WinRT OCR not initialized"
}
