import os
import re

slides_dir = os.path.join(os.path.dirname(__file__), "slides")

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

for filename in slides:
    filepath = os.path.join(slides_dir, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Ensure matrix-dots is present
    if "class=\"matrix-dots\"" not in content and "<div data-object=\"true\" data-object-type=\"shape\" class=\"grid-overlay\"" in content:
        content = content.replace(
            "<div data-object=\"true\" data-object-type=\"shape\" class=\"grid-overlay\" style=\"z-index:2;\"></div>",
            "<div data-object=\"true\" data-object-type=\"shape\" class=\"grid-overlay\" style=\"z-index:2;\"></div>\n  <div data-object=\"true\" data-object-type=\"shape\" class=\"matrix-dots\" style=\"z-index:2;\"></div>"
        )

    # Replace orb-teal with orb-amber for warm ember ProofBridge branding
    content = content.replace("orb-teal", "orb-amber")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Polished {filename}")
