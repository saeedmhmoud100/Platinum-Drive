"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PDFViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl: string;
  fileName: string;
}

export default function PDFViewer({
  open,
  onOpenChange,
  pdfUrl,
  fileName,
}: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("تم تحميل الملف");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("فشل تحميل الملف");
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-7xl h-[85vh] sm:h-[90vh] p-0 gap-0 flex flex-col"
        dir="rtl"
      >
        <VisuallyHidden>
          <DialogTitle>معاينة ملف PDF - {fileName}</DialogTitle>
        </VisuallyHidden>

        {/* Header with Title and Controls - Combined Section */}
        <div className="shrink-0 border-b bg-background">
          {/* Title Row */}
          <div className="px-2 sm:px-4 pt-2 sm:pt-4 pb-2 sm:pb-3 pr-12 sm:pr-14">
            <p className="font-semibold text-xs sm:text-base truncate">
              {fileName}
            </p>
          </div>

          {/* Toolbar Row */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 pb-2 sm:pb-3 overflow-x-auto">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="h-7 w-7 sm:h-9 sm:w-9 p-0"
              >
                <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <span className="text-[10px] sm:text-sm font-medium px-1 sm:px-3 min-w-[40px] sm:min-w-[60px] text-center">
                {zoom}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="h-7 w-7 sm:h-9 sm:w-9 p-0"
              >
                <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            <div className="h-4 sm:h-6 w-px bg-border hidden sm:block" />

            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="h-7 sm:h-9 px-2 sm:px-3 hidden sm:inline-flex"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-4 w-4 ml-2" />
                  خروج من ملء الشاشة
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4 ml-2" />
                  ملء الشاشة
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-7 sm:h-9 px-2 sm:px-3"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 sm:ml-2" />
              <span className="hidden sm:inline">تحميل</span>
            </Button>
          </div>
        </div>

        {/* PDF Container */}
        <div className="flex-1 overflow-auto bg-muted/20">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border-0"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
            title={fileName}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
