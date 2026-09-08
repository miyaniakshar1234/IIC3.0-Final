import os
import json
from playwright.sync_api import sync_playwright
try:
    from PyPDF2 import PdfMerger
except ImportError:
    from pypdf import PdfMerger
from pptx import Presentation
from pptx.util import Inches

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    slides_dir = os.path.join(base_dir, "Final_PPT")
    output_dir = os.path.join(base_dir, "Final_PPT")
    os.makedirs(output_dir, exist_ok=True)

    pdf_merger = PdfMerger()
    prs = Presentation()

    # 16:9 widescreen: 13.333 x 7.5 inches
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_slide_layout = prs.slide_layouts[6]

    # Use manifest playlist if present for correct slide progression
    manifest_path = os.path.join(slides_dir, "manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)
        html_files = manifest.get("playlist", [])
    else:
        html_files = sorted([f for f in os.listdir(slides_dir) if f.endswith(".html") and f != "index.html"])

    print(f"Found {len(html_files)} slides in {slides_dir}.")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        temp_images = []
        temp_pdfs = []

        for idx, html_file in enumerate(html_files):
            slide_num = f"{idx+1:02d}"
            print(f"Processing Slide {slide_num}: {html_file}...")
            file_path = f"file:///{os.path.join(slides_dir, html_file).replace('\\', '/')}"
            page.goto(file_path, wait_until="networkidle")

            # 1. Print layout matches 1920x1080 (16:9) exact width and height with zero margin
            pdf_path = os.path.join(output_dir, f"slide_{slide_num}_{html_file.replace('.html', '.pdf')}")
            page.pdf(
                path=pdf_path,
                width="13.333in",
                height="7.5in",
                print_background=True,
                margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
            )
            pdf_merger.append(pdf_path)
            temp_pdfs.append(pdf_path)

            # 2. Save screenshot at 1920x1080
            img_path = os.path.join(output_dir, f"slide_{slide_num}_{html_file.replace('.html', '.png')}")
            page.screenshot(path=img_path)
            temp_images.append(img_path)

            # 3. Add to PPTX full bleed
            slide = prs.slides.add_slide(blank_slide_layout)
            slide.shapes.add_picture(img_path, 0, 0, width=prs.slide_width, height=prs.slide_height)

        browser.close()

        # Clean up temporary individual PNG images to keep directory clean
        for img in temp_images:
            try:
                os.remove(img)
            except Exception:
                pass

    # Save PDF outputs
    pdf_output = os.path.join(output_dir, "ProofBridge_Presentation.pdf")
    pdf_merger.write(pdf_output)
    pdf_merger.close()

    # Also save as ProofBridge_Pitch_Deck.pdf and root ProofBridge_Pitch.pdf
    import shutil
    shutil.copyfile(pdf_output, os.path.join(output_dir, "ProofBridge_Pitch_Deck.pdf"))
    shutil.copyfile(pdf_output, os.path.join(base_dir, "ProofBridge_Pitch.pdf"))
    shutil.copyfile(pdf_output, os.path.join(base_dir, "ProofBridge_IIC3_Final_Pitch.pdf"))

    # Save PPTX outputs
    pptx_output = os.path.join(output_dir, "ProofBridge_Presentation.pptx")
    prs.save(pptx_output)
    prs.save(os.path.join(output_dir, "ProofBridge_Pitch_Deck.pptx"))
    prs.save(os.path.join(base_dir, "ProofBridge_Pitch.pptx"))
    prs.save(os.path.join(base_dir, "ProofBridge_IIC3_Final_Pitch.pptx"))
    prs.save(os.path.join(base_dir, "ProofBridge_Hackathon_Pitch.pptx"))

    # Clean up temporary individual slide PDFs
    for pdf in temp_pdfs:
        try:
            os.remove(pdf)
        except Exception:
            pass

    print("\nSUCCESS!")
    print(f"Generated PDF:  {pdf_output} ({os.path.getsize(pdf_output)} bytes)")
    print(f"Generated PPTX: {pptx_output} ({os.path.getsize(pptx_output)} bytes)")

if __name__ == "__main__":
    main()
