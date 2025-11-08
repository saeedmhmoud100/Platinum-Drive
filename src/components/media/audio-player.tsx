"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Music } from "lucide-react";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface AudioPlayerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  audioUrl: string;
  fileName: string;
  mimeType: string;
}

export default function AudioPlayer({
  open,
  onOpenChange,
  audioUrl,
  fileName,
  mimeType,
}: AudioPlayerProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("تم تحميل الملف الصوتي");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("فشل تحميل الملف الصوتي");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl" dir="rtl">
        <VisuallyHidden>
          <DialogTitle>تشغيل الملف الصوتي - {fileName}</DialogTitle>
        </VisuallyHidden>

        {/* Header - Single Section */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 pr-8 sm:pr-10">
          <p className="font-semibold text-xs sm:text-base truncate flex-1">
            {fileName}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="h-7 sm:h-9 px-2 sm:px-3 shrink-0"
          >
            <Download className="h-3 w-3 sm:h-4 sm:w-4 sm:ml-2" />
            <span className="hidden sm:inline">تحميل</span>
          </Button>
        </div>

        {/* Audio Player */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center p-8 sm:p-12 bg-muted rounded-lg">
            <Music className="h-12 w-12 sm:h-20 sm:w-20 text-muted-foreground" />
          </div>
          <audio controls className="w-full" autoPlay>
            <source src={audioUrl} type={mimeType} />
            متصفحك لا يدعم تشغيل الملفات الصوتية
          </audio>
        </div>
      </DialogContent>
    </Dialog>
  );
}
