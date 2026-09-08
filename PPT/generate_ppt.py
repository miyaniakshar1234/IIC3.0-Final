import collections 
import collections.abc
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
import os

# Create a blank presentation
prs = Presentation()

# Select a blank slide layout
blank_slide_layout = prs.slide_layouts[6] 
title_slide_layout = prs.slide_layouts[0]
bullet_slide_layout = prs.slide_layouts[1]

# Content for the slides
slides_data = [
    {
        "title": "MediBridge: Intelligent Medicine Accessibility & Availability Network",
        "content": [
            "From Prescription to Pharmacy — One Connected Network",
            "Domain: Open Innovation",
            "Team Name: Outliers",
            "Team Members: Akshar Miyani, Lubhanshi Mathur, Lakshita Sharma, Mohammad Faizan"
        ]
    },
    {
        "title": "The Core Problem",
        "content": [
            "The Reality: Obtaining a medicine seems simple. However, having a valid prescription does not guarantee access because the patient does not know where the required medicine is actually available.",
            "The Rural & Semi-Urban Crisis: The problem multiplies outside major cities. Patients face large distances between pharmacies, limited transportation, and zero centralized stock information.",
            "The Pain Point: A simple medicine search becomes a time-consuming physical journey. Patients travel from pharmacy to pharmacy, wasting money, fuel, and critical time."
        ]
    },
    {
        "title": "The Actual Gap & Target Users",
        "content": [
            "The Market Gap: Existing digital healthcare services focus on online consultation, medicine delivery, or finding pharmacy locations. But finding a pharmacy is NOT the same as finding a pharmacy that can fulfill a specific prescription.",
            "Our Focus: We are solving the 'Availability Gap' (Prescription -> Medicine Requirements -> Availability -> Verification -> Reservation -> Navigation).",
            "Target Users: Rural patients, Elderly people, Caregivers, and Independent pharmacies."
        ]
    },
    {
        "title": "The Proposed Solution: MediBridge Platform",
        "content": [
            "What is MediBridge? A connected platform that allows a patient to submit a prescription and determine exactly where the required medicines can be obtained locally before leaving home.",
            "Core User Journey:",
            "1. Upload: Patient uploads a photograph of a printed or handwritten prescription.",
            "2. Understanding: System extracts medicine names and dosages with confidence scores.",
            "3. Availability Search: System scans the inventory of participating local pharmacies.",
            "4. Complete Prescription Match: Identifies which pharmacy can fulfill 100% of the prescription."
        ]
    },
    {
        "title": "Key Features & USP",
        "content": [
            "'Complete My Prescription': Shows prescription fulfillment percentages (e.g., Pharmacy A: 100%).",
            "Advance Medicine Reservation: Reserve medicines for a specific pickup time. Pharmacy confirms, reducing travel uncertainty.",
            "Human Verification System: When handwritten prescriptions are unreadable, the system escalates to a local pharmacist for verification. (The system knows when it does not know).",
            "Rural Accessibility Mode: Voice-based searches, regional language support (Hindi, Gujarati)."
        ]
    },
    {
        "title": "Technology Stack (Zero-Cost & Scalable)",
        "content": [
            "Constraints Met: 100% Zero-Cost APIs, Web-first responsive, Python backend.",
            "AI/OCR Pipeline: Uses EasyOCR and PaddleOCR for cross-validated handwriting recognition; OpenCV for preprocessing; spaCy NLP for database matching.",
            "Frontend & UI: React 19 (Vite) with Framer Motion and Vanilla CSS for Glassmorphism.",
            "Backend & Database: Python FastAPI, Celery + Redis, PostgreSQL + PostGIS for spatial queries.",
            "Free Mapping: Leaflet.js and OpenStreetMap (bypassing Google Maps APIs)."
        ]
    },
    {
        "title": "Medicine Availability Intelligence (Network)",
        "content": [
            "Regional Shortage Detection: Analyzes network searches vs. availability to flag potential regional shortages (e.g., Demand: 87%, Availability: 22% -> Potential Shortage Alert).",
            "Pharmacy-to-Pharmacy Assistance: If Pharmacy A has 2/3 of the medicines and Pharmacy B has the rest, the network allows them to coordinate.",
            "Inventory & Expiry Awareness: Provides local pharmacies with data on frequently requested medicines and upcoming inventory expiries."
        ]
    },
    {
        "title": "Feasibility, Safety & Social Impact",
        "content": [
            "Economic Feasibility: Open-source AI and free mapping tools ensure zero API costs, making it highly sustainable for scaling.",
            "Privacy & Safety Philosophy: Collects only what is necessary. MediBridge is an accessibility platform, not a doctor. AI handles efficiency; Humans handle ambiguity.",
            "Social & Environmental Impact: Drastically reduces out-of-pocket transportation expenses, lost working hours, and carbon emissions from multi-pharmacy trips."
        ]
    },
    {
        "title": "Team Outliers",
        "content": [
            "Akshar Miyani",
            "Lubhanshi Mathur",
            "Lakshita Sharma",
            "Mohammad Faizan",
            "",
            "Vision: To build a connected network where a prescription does not become a search problem."
        ]
    }
]

logo_1_path = r'd:\Projects\IIE3.0\PPT\extracted_images\ppt\media\image6.png'
logo_2_path = r'd:\Projects\IIE3.0\PPT\extracted_images\ppt\media\image10.png'

for i, slide_data in enumerate(slides_data):
    if i == 0:
        slide = prs.slides.add_slide(title_slide_layout)
        title = slide.shapes.title
        subtitle = slide.placeholders[1]
        title.text = slide_data["title"]
        subtitle.text = "\n".join(slide_data["content"])
    else:
        slide = prs.slides.add_slide(bullet_slide_layout)
        title = slide.shapes.title
        body = slide.placeholders[1]
        title.text = slide_data["title"]
        
        tf = body.text_frame
        tf.text = slide_data["content"][0]
        for item in slide_data["content"][1:]:
            p = tf.add_paragraph()
            p.text = item
            p.level = 0
            
    # Add logos to all slides
    try:
        if os.path.exists(logo_1_path):
            slide.shapes.add_picture(logo_1_path, Inches(0.2), Inches(0.2), width=Inches(1.5))
        if os.path.exists(logo_2_path):
            slide.shapes.add_picture(logo_2_path, Inches(8.0), Inches(0.2), width=Inches(1.5))
    except Exception as e:
        print("Error adding logo:", e)

output_path = r'd:\Projects\IIE3.0\PPT\MediBridge_Hackathon_Pitch.pptx'
prs.save(output_path)
print(f"Presentation saved successfully at {output_path}")
