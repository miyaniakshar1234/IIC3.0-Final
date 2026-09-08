import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def build_presentation():
    template_path = os.path.join(os.path.dirname(__file__), "Templet.pptx")
    prs = pptx.Presentation(template_path)

    # Color Palette matching ProofBridge & Templet aesthetic
    COLOR_TITLE = RGBColor(26, 22, 18)        # Dark Charcoal
    COLOR_AMBER = RGBColor(184, 118, 42)      # Deep Amber / Gold
    COLOR_TEAL = RGBColor(15, 118, 110)       # Deep Teal / Cyan
    COLOR_TEXT = RGBColor(44, 41, 34)         # Body Text Dark
    COLOR_MUTED = RGBColor(107, 93, 74)       # Muted Text
    COLOR_SUCCESS = RGBColor(22, 163, 74)     # Success Green

    def style_run(run, text, font_name="Segoe UI", size_pt=12, bold=False, italic=False, color=COLOR_TEXT):
        run.text = text
        run.font.name = font_name
        run.font.size = Pt(size_pt)
        run.font.bold = bold
        run.font.italic = italic
        run.font.color.rgb = color

    # =========================================================================
    # SLIDE 1: Title Slide
    # =========================================================================
    slide1 = prs.slides[0]
    for shape in slide1.shapes:
        if shape.has_text_frame:
            txt = shape.text_frame.text.strip()
            if "INTERNATIONAL INNOVATION CHALLENGE" in txt:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "INTERNATIONAL INNOVATION CHALLENGE 3.0", size_pt=24, bold=True, color=COLOR_TITLE)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "MANIPAL UNIVERSITY JAIPUR · HACKATHON FINALS 2026", size_pt=14, bold=True, color=COLOR_AMBER)
            elif "Theme-" in txt:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "Theme: ", bold=True, size_pt=13, color=COLOR_AMBER)
                style_run(p.add_run(), "EdTech — Education Technology (PS-08)", size_pt=13, color=COLOR_TEXT)
            elif "Idea Title-" in txt:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "Idea Title: ", bold=True, size_pt=13, color=COLOR_AMBER)
                style_run(p.add_run(), "ProofBridge — Cryptographic Skill Verification Network", bold=True, size_pt=13, color=COLOR_TITLE)
            elif "Team Name" in txt:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "Team Name: ", bold=True, size_pt=13, color=COLOR_AMBER)
                style_run(p.add_run(), "Team Outliers", bold=True, size_pt=13, color=COLOR_TITLE)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "Akshar Miyani · Lubhanshi Mathur · Lakshita Sharma · Mohammad Faizan", size_pt=11, color=COLOR_MUTED)

    # =========================================================================
    # SLIDE 2: Idea Title / Proposed Solution
    # =========================================================================
    slide2 = prs.slides[1]
    for shape in slide2.shapes:
        if shape.has_text_frame and "IDEA TITLE" in shape.text_frame.text:
            shape.text_frame.clear()
            p = shape.text_frame.paragraphs[0]
            style_run(p.add_run(), "PROOFBRIDGE: EVIDENCE-BASED TALENT INTELLIGENCE", size_pt=20, bold=True, color=COLOR_TITLE)
            p2 = shape.text_frame.add_paragraph()
            style_run(p2.add_run(), "Moving from 'What students claim they know' to 'What students can mathematically prove they build'", size_pt=11, italic=True, color=COLOR_AMBER)

    # Populate Slide 2 Subshapes in Groups
    for shape in slide2.shapes:
        if shape.shape_type == pptx.enum.shapes.MSO_SHAPE_TYPE.GROUP:
            for sub in shape.shapes:
                if sub.has_text_frame:
                    t = sub.text_frame.text.strip()
                    if "Proposed Solution" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "The Core Problem: Resumes Are Broken", bold=True, size_pt=12, color=COLOR_AMBER)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• 78% of engineering resumes contain exaggerated claims; AI CV spam floods recruiters.\n• Semester letter grades fail to signal modular production competence (SQL, Docker, APIs).\n• Keyword ATS filters overlook high-potential students from non-elite colleges.", size_pt=10, color=COLOR_TEXT)
                    elif "Detailed explanation" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "The Proposed Solution: ProofBridge Architecture", bold=True, size_pt=12, color=COLOR_TEAL)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• Replaces self-reported text claims with an immutable, evidence-backed Skill Twin.\n• Analyzes raw GitHub code repositories, commit histories, and sandbox submissions.\n• Human faculty score standardized 4-tier rubrics (0% AI hallucination) with W3C JSON-LD proofs.", size_pt=10, color=COLOR_TEXT)
                    elif "How it addresses" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "How It Directly Solves PS-08", bold=True, size_pt=12, color=COLOR_SUCCESS)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• Skill Mapping: Translates student code into granular capability vectors.\n• Internships & Placements: Employers search verified vectors directly without CV screening.\n• Shortest-Path 'Bridge Me': Recommends highest-ROI challenges to close hiring deficits.", size_pt=10, color=COLOR_TEXT)
                    elif "Innovation and uniqueness" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "Core Innovations & USPs", bold=True, size_pt=12, color=COLOR_AMBER)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• Frozen Git Revisions (SHA-256) & Mandatory Student Contribution Statements.\n• Role Genomes: Requisitions reverse-engineered into weighted proficiency vectors (L1-L4).\n• Blind Talent Radar: 100% merit-based shortlisting eliminating pedigree bias.", size_pt=10, color=COLOR_TEXT)

    # =========================================================================
    # SLIDE 3: Technical Approach
    # =========================================================================
    slide3 = prs.slides[2]
    for shape in slide3.shapes:
        if shape.has_text_frame:
            t = shape.text_frame.text.strip()
            if "Technologies to be used" in t:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "• Frontend & UI: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p.add_run(), "Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion\n", size_pt=10, color=COLOR_TEXT)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "• Backend & Database: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p2.add_run(), "PostgreSQL with connection pool (pg), immutable revision logs, atomic state sync\n", size_pt=10, color=COLOR_TEXT)
                p3 = shape.text_frame.add_paragraph()
                style_run(p3.add_run(), "• Cryptography & Standards: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p3.add_run(), "W3C Verifiable Credentials (JSON-LD v1.0), SHA-256 Code Digests, Did:pb IDs\n", size_pt=10, color=COLOR_TEXT)
                p4 = shape.text_frame.add_paragraph()
                style_run(p4.add_run(), "• Matching Engine: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p4.add_run(), "coverage-v1 deterministic formula: Score = Σ [Weight_i × min(1, Level / Target)]", size_pt=10, color=COLOR_AMBER)
            elif "Methodology and process" in t:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "1. Institutional Trust Anchor: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p.add_run(), "University Dean certifies student enrollment under NAAC/NBA framework.\n", size_pt=10, color=COLOR_TEXT)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "2. Real GitHub & Sandbox Execution: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p2.add_run(), "Student completes authentic SQL/code challenges against dirty data.\n", size_pt=10, color=COLOR_TEXT)
                p3 = shape.text_frame.add_paragraph()
                style_run(p3.add_run(), "3. Immutable Code Freeze: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p3.add_run(), "Atomic commit lock with SHA-256 hash + contribution defense & AI disclosure.\n", size_pt=10, color=COLOR_TEXT)
                p4 = shape.text_frame.add_paragraph()
                style_run(p4.add_run(), "4. Faculty Rubric Audit: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p4.add_run(), "Accredited faculty scores 4-tier rubric (L1-L4) under < 24h SLA guarantee.\n", size_pt=10, color=COLOR_TEXT)
                p5 = shape.text_frame.add_paragraph()
                style_run(p5.add_run(), "5. Zero-Resume Matching: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p5.add_run(), "Employers query capability vectors directly, unlocking immediate candidate offers.", size_pt=10, color=COLOR_SUCCESS)

    # =========================================================================
    # SLIDE 4: Feasibility and Viability
    # =========================================================================
    slide4 = prs.slides[3]
    for shape in slide4.shapes:
        if shape.has_text_frame:
            t = shape.text_frame.text.strip()
            if "Analysis of the Feasibility" in t:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "• 100% Zero-Cost Architecture: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p.add_run(), "No recurring LLM API tokens or third-party verification fees.\n", size_pt=10, color=COLOR_TEXT)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "• Marginal Cost per Student: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p2.add_run(), "₹0.00 using self-hosted Next.js & PostgreSQL.\n", size_pt=10, color=COLOR_TEXT)
                p3 = shape.text_frame.add_paragraph()
                style_run(p3.add_run(), "• Seamless ERP/LMS Integration: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p3.add_run(), "Connects with Moodle, Canvas, and university portals via open REST endpoints.", size_pt=10, color=COLOR_TEXT)
            elif "Potential Challenges & Risks" in t:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "• AI-Assisted Plagiarism: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p.add_run(), "Risk of candidates pasting ChatGPT code without comprehension.\n", size_pt=10, color=COLOR_TEXT)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "• Faculty Bandwidth: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p2.add_run(), "Professors may have limited grading time during exam weeks.\n", size_pt=10, color=COLOR_TEXT)
                p3 = shape.text_frame.add_paragraph()
                style_run(p3.add_run(), "• University Cold-Start: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p3.add_run(), "Onboarding fresh institutions without established rubric catalogs.", size_pt=10, color=COLOR_TEXT)
            elif "Strategies to overcome" in t:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "• Mandatory Contribution Defense: ", bold=True, size_pt=10, color=COLOR_SUCCESS)
                style_run(p.add_run(), "Candidates must explain logic & disclose AI tooling usage.\n", size_pt=10, color=COLOR_TEXT)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "• 1-Click Rubric Queue: ", bold=True, size_pt=10, color=COLOR_SUCCESS)
                style_run(p2.add_run(), "Standardized rubrics allow grading in < 3 mins with SLA urgency tags.\n", size_pt=10, color=COLOR_TEXT)
                p3 = shape.text_frame.add_paragraph()
                style_run(p3.add_run(), "• Pre-Seeded Catalog: ", bold=True, size_pt=10, color=COLOR_SUCCESS)
                style_run(p3.add_run(), "Out-of-the-box challenge rubrics aligned with NAAC & NBA criteria.", size_pt=10, color=COLOR_TEXT)

    # =========================================================================
    # SLIDE 5: Impact and Benefits
    # =========================================================================
    slide5 = prs.slides[4]
    for shape in slide5.shapes:
        if shape.has_text_frame:
            t = shape.text_frame.text.strip()
            if "Potential Impact on the target audience" in t:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "Impact on Key Stakeholders", bold=True, size_pt=13, color=COLOR_AMBER)
                p1 = shape.text_frame.add_paragraph()
                style_run(p1.add_run(), "• Students: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p1.add_run(), "Verifiable Skill Passport shareable via simple HTTPS link; algorithmic roadmap to employability.\n", size_pt=10, color=COLOR_TEXT)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "• Employers: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p2.add_run(), "Blind vector talent search saves 42+ hours per technical role; 80% screening time reduction.\n", size_pt=10, color=COLOR_TEXT)
                p3 = shape.text_frame.add_paragraph()
                style_run(p3.add_run(), "• Faculty: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p3.add_run(), "Clean rubric grading under < 24h SLA; direct evidence generation for academic appraisal.\n", size_pt=10, color=COLOR_TEXT)
                p4 = shape.text_frame.add_paragraph()
                style_run(p4.add_run(), "• University Leadership: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p4.add_run(), "Real-time curriculum gap radar across cohorts (e.g. 620 students: 142 ready, 49% Docker deficit).", size_pt=10, color=COLOR_TEXT)
            elif "Benefits of the solution" in t:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                style_run(p.add_run(), "Multi-Dimensional Benefits & ROI", bold=True, size_pt=13, color=COLOR_TEAL)
                p1 = shape.text_frame.add_paragraph()
                style_run(p1.add_run(), "• Social & Merit Equity: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p1.add_run(), "Eliminates tier-1 college pedigree bias; candidates judged 100% on demonstrable code execution.\n", size_pt=10, color=COLOR_TEXT)
                p2 = shape.text_frame.add_paragraph()
                style_run(p2.add_run(), "• Economic Efficiency: ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p2.add_run(), "Cuts technical hiring cycle from 3 weeks to 48 hours with 3.2x higher interview conversion.\n", size_pt=10, color=COLOR_TEXT)
                p3 = shape.text_frame.add_paragraph()
                style_run(p3.add_run(), "• National Accreditation (NAAC & NBA): ", bold=True, size_pt=10, color=COLOR_TITLE)
                style_run(p3.add_run(), "Directly fulfills NAAC Criteria 2 & 5, NBA OBE Criterion 2.6, and NEP 2020 micro-credential rules.", size_pt=10, color=COLOR_SUCCESS)

    # =========================================================================
    # SLIDE 6: Research and References
    # =========================================================================
    slide6 = prs.slides[5]
    for shape in slide6.shapes:
        if shape.shape_type == pptx.enum.shapes.MSO_SHAPE_TYPE.GROUP:
            for sub in shape.shapes:
                if sub.has_text_frame:
                    sub.text_frame.clear()
                    p = sub.text_frame.paragraphs[0]
                    style_run(p.add_run(), "Foundational Research & Standardized Frameworks", bold=True, size_pt=13, color=COLOR_AMBER)
                    refs = [
                        ("1. W3C Verifiable Credentials Data Model v1.0:", "Official W3C Recommendation for decentralized, tamper-evident digital credentials on the Web."),
                        ("2. National Education Policy (NEP 2020):", "Government of India guidelines on competency-based curriculum, multidisciplinary credits, and modular micro-credentials."),
                        ("3. NAAC & NBA Accreditation Criteria:", "Framework for Outcome-Based Education (OBE) measuring Program Outcomes (POs) and student progression."),
                        ("4. ACM/IEEE Computing Curricula 2020 (CC2020):", "Global competency framework structuring knowledge, skills, and professional dispositions in software engineering."),
                        ("5. Empirical Software Engineering on Git Provenance:", "Research on static AST parsing, automated test coverage, and code commit digests for authentic skills validation.")
                    ]
                    for title_ref, desc_ref in refs:
                        p_item = sub.text_frame.add_paragraph()
                        style_run(p_item.add_run(), f"• {title_ref} ", bold=True, size_pt=10, color=COLOR_TITLE)
                        style_run(p_item.add_run(), desc_ref, size_pt=10, color=COLOR_TEXT)

    # =========================================================================
    # SLIDE 7: Working Prototype, Demo & Team (Replaces Guidelines)
    # =========================================================================
    slide7 = prs.slides[6]
    for shape in slide7.shapes:
        if shape.has_text_frame and "GUIDELINES" in shape.text_frame.text:
            shape.text_frame.clear()
            p = shape.text_frame.paragraphs[0]
            style_run(p.add_run(), "LIVE PROTOTYPE DEMONSTRATION & REPOSITORY", size_pt=20, bold=True, color=COLOR_TITLE)
            p2 = shape.text_frame.add_paragraph()
            style_run(p2.add_run(), "Fully functional end-to-end prototype deployed for IIC 3.0 MUJ Hackathon", size_pt=11, italic=True, color=COLOR_AMBER)

    for shape in slide7.shapes:
        if shape.shape_type == pptx.enum.shapes.MSO_SHAPE_TYPE.GROUP:
            for sub in shape.shapes:
                if sub.has_text_frame:
                    t = sub.text_frame.text.strip()
                    if "PPT submission is compulsory" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "Live Interactive Application Prototype", bold=True, size_pt=12, color=COLOR_TEAL)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• Running Locally: http://localhost:3000\n• Includes Public Verifier Gateway (/verify), Candidate Skill Passport, and Reviewer SLA Queue.", size_pt=10, color=COLOR_TEXT)
                    elif "Follow the color scheme" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "GitHub Repository & Open-Source Code", bold=True, size_pt=12, color=COLOR_AMBER)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• GitHub Repo: https://github.com/miyaniakshar1234/IIC3.0-Final\n• Full codebase in Next.js 14, TypeScript, PostgreSQL migrations, and automated challenge suites.", size_pt=10, color=COLOR_TEXT)
                    elif "Kindly keep the maximum" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "Key Delivered Functional Modules", bold=True, size_pt=12, color=COLOR_SUCCESS)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• 1. Candidate Skill Twin with W3C JSON-LD Export & SHA-256 Digest\n• 2. 'Bridge Me' Shortest-Path Algorithmic Pathfinder Sandbox (61% → 96%)\n• 3. Faculty Reviewer Queue with SLA urgency tags & Dean Curriculum Gap Radar.", size_pt=10, color=COLOR_TEXT)
                    elif "Try to avoid paragraphs" in t:
                        sub.text_frame.clear()
                        p = sub.text_frame.paragraphs[0]
                        style_run(p.add_run(), "Team Outliers · Contact & Credits", bold=True, size_pt=12, color=COLOR_TITLE)
                        p2 = sub.text_frame.add_paragraph()
                        style_run(p2.add_run(), "• Akshar Miyani (Lead Architect) · Lubhanshi Mathur (UX & Product)\n• Lakshita Sharma (Accreditation & Rubrics) · Mohammad Faizan (Backend & QA)\n• 'Judged by what you build · Verified by mathematics · Trusted by industry.'", size_pt=10, color=COLOR_TEXT)

    # Save to both target locations
    output_pptx = os.path.join(os.path.dirname(__file__), "ProofBridge_IIC3_Final_Pitch.pptx")
    legacy_pptx = os.path.join(os.path.dirname(__file__), "ProofBridge_Hackathon_Pitch.pptx")
    
    prs.save(output_pptx)
    prs.save(legacy_pptx)
    print(f"SUCCESS: Saved presentation to {output_pptx}")
    print(f"SUCCESS: Also updated {legacy_pptx}")

if __name__ == "__main__":
    build_presentation()
