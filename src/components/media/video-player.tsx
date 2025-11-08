"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface VideoPlayerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  fileName: string;
  mimeType: string;
}

export default function VideoPlayer({
  open,
  onOpenChange,
  videoUrl,
  fileName,
  mimeType,
}: VideoPlayerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-5xl p-0 gap-0 flex flex-col"
        dir="rtl"
      >
        <VisuallyHidden>
          <DialogTitle>تشغيل الفيديو - {fileName}</DialogTitle>
        </VisuallyHidden>

        {/* Header - Title Only */}
        <div className="shrink-0 px-3 sm:px-4 py-2 sm:py-3 border-b bg-background">
          <p className="font-semibold text-xs sm:text-base truncate">
            {fileName}
          </p>
        </div>

        {/* Video Player */}
        <div className="bg-black">
          <video
            controls
            className="w-full h-auto max-h-[60vh] sm:max-h-[70vh]"
            controlsList="nodownload"
            autoPlay
          >
            <source src={videoUrl} type={mimeType} />
            متصفحك لا يدعم تشغيل الفيديو
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
