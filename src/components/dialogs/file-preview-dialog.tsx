"use client";

import { useState, useEffect } from "react";
import ImagePreview from "@/components/media/image-preview";
import PDFViewer from "@/components/media/pdf-viewer";
import VideoPlayer from "@/components/media/video-player";
import AudioPlayer from "@/components/media/audio-player";
import TextCodeViewer from "@/components/media/text-code-viewer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileQuestion, Download } from "lucide-react";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface FilePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileId: string;
  fileName: string;
  mimeType: string;
  fileSize?: number;
}

// Determine file category and if it's previewable
function getFilePreviewType(mimeType: string, fileName: string): string {
  // Image types
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  // PDF
  if (mimeType === "application/pdf") {
    return "pdf";
  }

  // Video types
  if (mimeType.startsWith("video/")) {
    return "video";
  }

  // Audio types
  if (mimeType.startsWith("audio/")) {
    return "audio";
  }

  // Text and code types
  const textTypes = [
    "text/plain",
    "text/html",
    "text/css",
    "text/javascript",
    "text/markdown",
    "application/json",
    "application/xml",
    "text/xml",
  ];

  const codeExtensions = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".rb",
    ".java",
    ".c",
    ".cpp",
    ".cs",
    ".php",
    ".go",
    ".rs",
    ".swift",
    ".kt",
    ".scala",
    ".sh",
    ".bash",
    ".html",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".json",
    ".yaml",
    ".yml",
    ".md",
    ".sql",
    ".graphql",
    ".txt",
    ".log",
  ];

  if (
    textTypes.includes(mimeType) ||
    codeExtensions.some((ext) => fileName.toLowerCase().endsWith(ext))
  ) {
    return "text";
  }

  return "unsupported";
}

export default function FilePreviewDialog({
  open,
  onOpenChange,
  fileId,
  fileName,
  mimeType,
  fileSize,
}: FilePreviewDialogProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const previewType = getFilePreviewType(mimeType, fileName);

  useEffect(() => {
    if (open && fileId) {
      // Use the preview API endpoint
      const url = `/api/files/${fileId}/preview`;
      setFileUrl(url);
      setLoading(false);
    }
  }, [open, fileId]);

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
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

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent dir="rtl" className="max-w-[95vw] sm:max-w-lg">
          <div className="flex items-center justify-center py-8 sm:py-12">
            <div className="text-center">
              <div className="inline-block h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                جاري التحميل...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Route to appropriate viewer
  switch (previewType) {
    case "image":
      return (
        <ImagePreview
          open={open}
          onOpenChange={onOpenChange}
          imageUrl={fileUrl}
          fileName={fileName}
        />
      );

    case "pdf":
      return (
        <PDFViewer
          open={open}
          onOpenChange={onOpenChange}
          pdfUrl={fileUrl}
          fileName={fileName}
        />
      );

    case "video":
      return (
        <VideoPlayer
          open={open}
          onOpenChange={onOpenChange}
          videoUrl={fileUrl}
          fileName={fileName}
          mimeType={mimeType}
        />
      );

    case "audio":
      return (
        <AudioPlayer
          open={open}
          onOpenChange={onOpenChange}
          audioUrl={fileUrl}
          fileName={fileName}
          mimeType={mimeType}
        />
      );

    case "text":
      return (
        <TextCodeViewer
          open={open}
          onOpenChange={onOpenChange}
          fileUrl={fileUrl}
          fileName={fileName}
          mimeType={mimeType}
        />
      );

    default:
      // Unsupported file type
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent dir="rtl" className="max-w-[95vw] sm:max-w-lg">
            <VisuallyHidden>
              <DialogTitle>ملف غير مدعوم - {fileName}</DialogTitle>
            </VisuallyHidden>

            <div className="text-center py-6 sm:py-8">
              <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-muted-foreground opacity-50" />
              <p className="font-semibold text-base sm:text-lg mb-1">
                {fileName}
              </p>
              <p className="text-sm sm:text-base font-medium mb-2 mt-3 sm:mt-4">
                معاينة هذا النوع من الملفات غير مدعومة
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                يمكنك تحميل الملف لعرضه على جهازك
              </p>
              <Button onClick={handleDownload} className="h-8 sm:h-10">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                تحميل الملف
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
  }
}
