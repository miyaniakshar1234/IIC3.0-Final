import os
import subprocess
import pptx
from pptx.util import Inches
from pypdf import PdfWriter, PdfReader

def main():
    ppt_dir = os.path.dirname(os.path.abspath(__file__))
    slides_dir = os.path.join(ppt_dir, "slides")
    rendered_dir = os.path.join(ppt_dir, "rendered_slides")
    os.makedirs(rendered_dir, exist_ok=True)

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(chrome_path):
        chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

    slides = [
        "01-title.html",
        "02-problem.html",
        "03-gap-users.html",
        "04-solution.html",
        "05-features.html",
        "06-tech-stack.html",
        "07-network-intelligence.html",
        "08-feasibility-impact.html",
        "09-team.html"
    ]

    png_files = []
    pdf_files = []

    print("Step 1: Rendering 1920x1080 High-DPI Visuals via Headless Chrome...")
    for idx, slide_file in enumerate(slides):
        slide_num = f"{idx+1:02d}"
        slide_path = os.path.join(slides_dir, slide_file)
        file_url = f"file:///{slide_path.replace(os.sep, '/')}"

        out_png = os.path.join(rendered_dir, f"slide_{slide_num}.png")
        out_pdf = os.path.join(rendered_dir, f"slide_{slide_num}.pdf")

        # Screenshot PNG (1920x1080)
        cmd_png = [
            chrome_path,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--window-size=1920,1080",
            f"--screenshot={out_png}",
            file_url
        ]
        subprocess.run(cmd_png, check=True, capture_output=True)
        png_files.append(out_png)

        # High-res PDF slide
        cmd_pdf = [
            chrome_path,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--print-to-pdf-no-header",
            f"--print-to-pdf={out_pdf}",
            file_url
        ]
        subprocess.run(cmd_pdf, check=True, capture_output=True)
        pdf_files.append(out_pdf)

        print(f"  [OK] Slide {slide_num} rendered ({slide_file})")

    # Step 2: Assemble Single PDF
    print("\nStep 2: Merging slides into master PDF...")
    merger = PdfWriter()
    for pdf in pdf_files:
        reader = PdfReader(pdf)
        for page in reader.pages:
            merger.add_page(page)

    final_pdf_path = os.path.join(ppt_dir, "ProofBridge_Pitch.pdf")
    with open(final_pdf_path, "wb") as f_out:
        merger.write(f_out)
    print(f"  [OK] Master PDF created: {final_pdf_path} ({os.path.getsize(final_pdf_path)} bytes)")

    # Step 3: Build Full-Bleed 16:9 PowerPoint Presentation
    print("\nStep 3: Creating master PowerPoint presentation (.pptx)...")
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    for png in png_files:
        slide = prs.slides.add_slide(blank_layout)
        slide.shapes.add_picture(png, Inches(0), Inches(0), width=Inches(13.333), height=Inches(7.5))

    final_pptx_path = os.path.join(ppt_dir, "ProofBridge_Pitch.pptx")
    prs.save(final_pptx_path)
    print(f"  [OK] Master PPTX created: {final_pptx_path} ({os.path.getsize(final_pptx_path)} bytes)")

    # Also update previous files so whichever file the user opens, they get the perfect presentation
    prs.save(os.path.join(ppt_dir, "ProofBridge_Hackathon_Pitch.pptx"))
    prs.save(os.path.join(ppt_dir, "ProofBridge_IIC3_Final_Pitch.pptx"))
    with open(os.path.join(ppt_dir, "ProofBridge_IIC3_Final_Pitch.pdf"), "wb") as f_out:
        merger.write(f_out)

    print("\nALL PRESENTATION DELIVERABLES COMPILED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
