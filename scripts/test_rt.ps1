$runtime = [System.IO.Path]::Combine([System.Runtime.InteropServices.RuntimeEnvironment]::GetRuntimeDirectory(), "System.Runtime.WindowsRuntime.dll")
if (Test-Path $runtime) {
    Add-Type -Path $runtime
    Write-Host "System.Runtime.WindowsRuntime loaded!"
} else {
    Write-Host "System.Runtime.WindowsRuntime not at $runtime"
}
