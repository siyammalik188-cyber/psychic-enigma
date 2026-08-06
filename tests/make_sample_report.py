from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

OUT = "/app/tests/sample_lab_report.pdf"

ROWS = [
    ("Haemoglobin", "10.2", "g/dL", "12.0 - 15.5"),
    ("Haematocrit", "31.4", "%", "36 - 46"),
    ("MCV", "74", "fL", "80 - 100"),
    ("Ferritin", "8", "ng/mL", "15 - 150"),
    ("White Blood Cells", "6.8", "10^3/uL", "4.5 - 11.0"),
    ("Platelets", "310", "10^3/uL", "150 - 400"),
    ("TSH", "3.1", "mIU/L", "0.4 - 4.0"),
    ("Vitamin B12", "410", "pg/mL", "200 - 900"),
    ("Fasting Glucose", "104", "mg/dL", "70 - 99"),
    ("Total Cholesterol", "218", "mg/dL", "< 200"),
    ("LDL Cholesterol", "141", "mg/dL", "< 100"),
    ("HDL Cholesterol", "58", "mg/dL", "> 50"),
]


def main():
    c = canvas.Canvas(OUT, pagesize=LETTER)
    w, h = LETTER
    y = h - inch

    c.setFont("Helvetica-Bold", 16)
    c.drawString(inch, y, "NORTHFIELD CLINICAL LABORATORY")
    y -= 20
    c.setFont("Helvetica", 10)
    c.drawString(inch, y, "412 Harrow Street, Northfield  |  Accession 8841-2207")
    y -= 34

    c.setFont("Helvetica-Bold", 12)
    c.drawString(inch, y, "Patient: Priya Raman     DOB: 12 Mar 1991     Sex: F")
    y -= 16
    c.setFont("Helvetica", 10)
    c.drawString(inch, y, "Collected: 04 Jun 2026 08:12   Reported: 04 Jun 2026 16:40")
    y -= 16
    c.drawString(inch, y, "Ordering physician: Dr. A. Whitfield, MD")
    y -= 30

    c.setFont("Helvetica-Bold", 12)
    c.drawString(inch, y, "COMPLETE BLOOD COUNT / IRON STUDIES / METABOLIC PANEL")
    y -= 22

    c.setFont("Helvetica-Bold", 10)
    for x, label in ((inch, "TEST"), (3.3 * inch, "RESULT"), (4.3 * inch, "UNITS"), (5.4 * inch, "REFERENCE RANGE")):
        c.drawString(x, y, label)
    y -= 6
    c.line(inch, y, w - inch, y)
    y -= 16

    c.setFont("Helvetica", 10)
    for name, value, unit, ref in ROWS:
        c.drawString(inch, y, name)
        c.drawString(3.3 * inch, y, value)
        c.drawString(4.3 * inch, y, unit)
        c.drawString(5.4 * inch, y, ref)
        y -= 18

    y -= 16
    c.setFont("Helvetica-Bold", 10)
    c.drawString(inch, y, "COMMENTS")
    y -= 16
    c.setFont("Helvetica", 10)
    for line in [
        "Microcytic anaemia pattern with low ferritin, consistent with iron deficiency.",
        "Fasting glucose slightly above the reference range; suggest repeat with HbA1c.",
        "Lipid panel shows elevated LDL. Correlate clinically.",
    ]:
        c.drawString(inch, y, line)
        y -= 15

    c.showPage()
    c.save()
    print("written", OUT)


if __name__ == "__main__":
    main()
