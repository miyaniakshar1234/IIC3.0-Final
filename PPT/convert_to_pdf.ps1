param (
    [string]$pptxPath = "D:\IIC3.0\ProofBridge\PPT\ProofBridge_IIC3_Pitch.pptx",
    [string]$pdfPath = "D:\IIC3.0\ProofBridge\PPT\ProofBridge_IIC3_Pitch.pdf"
)

try {
    $powerPoint = New-Object -ComObject PowerPoint.Application
    $presentation = $powerPoint.Presentations.Open($pptxPath, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
    # ppSaveAsPDF format code is 32
    $presentation.SaveAs($pdfPath, 32)
    $presentation.Close()
    $powerPoint.Quit()
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
    Write-Host "SUCCESS: PDF created at $pdfPath"
} catch {
    Write-Error "ERROR: $_"
}
