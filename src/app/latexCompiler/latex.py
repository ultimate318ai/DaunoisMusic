"""TODO"""

from typing import Any, Literal, TypeAlias

from dataclasses import dataclass

from socketserver import BaseServer
from pylatex import (
    Document,
    Command,
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
from pylatex.base_classes import Environment
from pylatex.package import Package

from pylatex.utils import italic, NoEscape
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
import io
import pathlib
import platform


MusicSize: TypeAlias = (
    Literal["\\smallmusicsize"]
    | Literal["\\normalmusicsize"]
    | Literal["\\largemusicsize"]
    | Literal["\\Largemusicsize"]
)


@dataclass
class LatexJson:
    """TODO"""

    name: None
    size: MusicSize


class Config:
    """Configuration for backend API."""

    BACKEND_PORT = 8080
    FRONTEND_PORT = 4200
    ORIGIN_IP_ADDRESS = f"http://localhost:{FRONTEND_PORT}"


class LatexPDFGenerator:
    """TODO"""

    latex_json: LatexJson
    document_title: str
    author: str
    document: Document

    class Music(Environment):
        """A class to wrap LaTeX's Musitex environment."""

        packages = [Package("musixtex")]
        escape: Any = False
        content_separator = "\n"

    def __init__(
        self,
        latex_json: LatexJson,
        document_title: str | None = None,
        author: str | None = None,
        file_path: pathlib.Path | None = None,
    ):
        self.document_title = document_title or "new Document"
        self.author = author or "LatexGenerator"
        path = file_path or pathlib.Path("./")
        self.document = Document(str(path.parent))
        self.latex_json = latex_json

    def generate_document_header(self):
        """TODO"""

        self.document.preamble.append(Command("title", "Awesome Title"))
        self.document.preamble.append(Command("author", "Anonymous author"))
        self.document.preamble.append(Command("date", NoEscape(r"\today")))
        self.document.append(NoEscape(r"\maketitle"))

    def generate_latex_document(self):
        """TODO"""
        self.generate_document_header()
        self.generate_latex_music_size()
        with self.document.create(self.Music()):
            notes = self.generate_latex_music_content()
            self.document.append(notes)

    def generate_latex_music_size(self):
        """TODO"""
        self.document.append(self.latex_json.size)

    def generate_latex_music_content(self):
        """TODO"""
        return ""

    def generate_latex_pdf(self, clean_latex: bool = False):
        """TODO"""
        self.document.generate_pdf(clean_tex=clean_latex)


class Server(BaseHTTPRequestHandler):
    """
    TODO
    """

    latex_generator: LatexPDFGenerator | None = None

    def _init_latex(self, latex_json: Any):
        if not self.latex_generator:
            self.latex_generator = LatexPDFGenerator(latex_json)

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.send_header("Access-Control-Allow-Origin", Config.ORIGIN_IP_ADDRESS)
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        """Handle a get for the backend API."""

        match self.path:
            case _ as wrong_path:
                self.send_response(404, f"Path Not found {wrong_path}")
                self.send_header(
                    "Access-Control-Allow-Origin", Config.ORIGIN_IP_ADDRESS
                )
                self.end_headers()

    def do_POST(self):
        """Handle post in the backend API"""

        match self.path:

            case "/latex":
                self.send_response(200, "OK")
                self.send_header(
                    "Access-Control-Allow-Origin", Config.ORIGIN_IP_ADDRESS
                )
                self.end_headers()
                bytes_received = int(self.headers["Content-Length"])
                latex_json: LatexJson = json.load(
                    io.BytesIO(self.rfile.read(bytes_received).replace(b"'", b'"'))
                ).get("json", None)
                self._init_latex(latex_json)
                if not self.latex_generator:
                    raise ValueError("Latex Compiler should be created")
                self.latex_generator.generate_latex_pdf()

            case _ as wrong_path:
                self.send_response(404, f"Path Not found {wrong_path}")
                self.send_header(
                    "Access-Control-Allow-Origin", Config.ORIGIN_IP_ADDRESS
                )
                self.end_headers()


httpd = HTTPServer(("localhost", Config.BACKEND_PORT), Server)
print(f"Server listening on port {Config.BACKEND_PORT}")

httpd.serve_forever()
