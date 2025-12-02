import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Candidate } from "@/types/candidate";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  candidate: Candidate;
}

export const CandidateResume = ({ candidate }: Props) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const handleClickNext = () => {
    setPageNumber((prevPageNumber) =>
      prevPageNumber < numPages ? prevPageNumber + 1 : prevPageNumber
    );
  };

  const handleClickPrev = () => {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : prevPageNumber
    );
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <ScrollArea className="w-full h-full">
      <div
        ref={containerRef}
        className="group relative flex justify-center items-center w-full"
      >
        <Document
          file={candidate.resumeFile}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<PdfLoader name={candidate.name} />}
          error={<PdfError />}
          noData={<PdfError />}
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth > 0 ? containerWidth : undefined}
            scale={containerWidth <= 600 ? 0.9 : 0.8}
          />
        </Document>

        {/* Next And Back Buttons */}
        <div className="bottom-0 group-hover:bottom-2 z-10 fixed flex justify-center items-center gap-4 bg-background opacity-0 group-hover:opacity-100 p-2 border border-border rounded-lg transition-all duration-300">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleClickPrev}
              disabled={pageNumber === 1}
              size="icon-sm"
            >
              <ChevronLeft />
            </Button>
            <p>
              {pageNumber} of {numPages}
            </p>
            <Button
              onClick={handleClickNext}
              disabled={pageNumber === numPages}
              size="icon-sm"
            >
              <ChevronRight />
            </Button>
          </div>

          <Button size="icon-sm" asChild>
            <Link
              to={candidate.resumeFile!}
              download={candidate.resumeFileName}
              target="_blank"
            >
              <Download />
            </Link>
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

const PdfLoader = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-center items-center gap-2 h-[calc(100vh-73px)]">
      <Loader2 className="size-4 animate-spin" />
      <p className="text-sm">Loading {name} resume...</p>
    </div>
  );
};

const PdfError = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full h-[calc(100vh-73px)]">
      <div className="bg-destructive/10 p-3 rounded-lg text-destructive">
        <TriangleAlert className="size-6" />
      </div>
      <p className="font-semibold text-lg">Failed to Load PDF File</p>
      <Button
        variant="destructive"
        className="cursor-pointer"
        onClick={() => window.location.reload()}
      >
        Reload PDF
      </Button>
    </div>
  );
};
