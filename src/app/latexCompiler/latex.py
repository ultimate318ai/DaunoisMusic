from pylatex import (
    Document,
    Section,
    Subsection,
    Tabular,
    Math,
    TikZ,
    Axis,
    Plot,
    Figure,
    Matrix,
    Alignat,
)
from pylatex.utils import italic


if __name__ == "__main__":
    document = Document()

    with document.create(Section("This is a test")):
        document.append("Some regular text and some")
        document.append(italic("italic text. "))
    document.generate_pdf("test", clean_tex=False)

# TODO: add this in post request -> backend
