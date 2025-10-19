'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface TextCodeViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileUrl: string
  fileName: string
  mimeType: string
}

// Map file extensions to syntax highlighter languages
const getLanguageFromFileName = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase()
  
  const languageMap: { [key: string]: string } = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    py: 'python',
    rb: 'ruby',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    php: 'php',
    go: 'go',
    rs: 'rust',
    swift: 'swift',
    kt: 'kotlin',
    scala: 'scala',
    sh: 'bash',
    bash: 'bash',
    html: 'html',
    xml: 'xml',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    less: 'less',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    md: 'markdown',
    sql: 'sql',
    graphql: 'graphql',
    dockerfile: 'docker',
  }

  return languageMap[ext || ''] || 'text'
}

// Check if file should have syntax highlighting
const shouldHighlight = (fileName: string): boolean => {
  const ext = fileName.split('.').pop()?.toLowerCase()
  return ![
    'txt', 'log', 'csv', 'tsv',
  ].includes(ext || '')
}

export default function TextCodeViewer({
  open,
  onOpenChange,
  fileUrl,
  fileName,
  mimeType,
}: TextCodeViewerProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const language = getLanguageFromFileName(fileName)
  const useHighlighting = shouldHighlight(fileName)

  useEffect(() => {
    if (open) {
      loadFileContent()
    }
  }, [open, fileUrl])

  const loadFileContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(fileUrl)
      const text = await response.text()
      setContent(text)
    } catch (error) {
      console.error('Failed to load file:', error)
      toast.error('فشل تحميل محتوى الملف')
      setContent('فشل تحميل محتوى الملف')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success('تم نسخ المحتوى')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('تم تحميل الملف')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('فشل تحميل الملف')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0 flex flex-col" dir="rtl">
        <VisuallyHidden>
          <DialogTitle>معاينة الملف النصي - {fileName}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header - Single Unified Section */}
        <div className="shrink-0 flex items-center justify-between px-4 py-4 border-b bg-background">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <p className="font-semibold truncate">{fileName}</p>
            {useHighlighting && (
              <span className="text-xs px-2 py-0.5 bg-muted rounded">
                {language}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={loading}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 ml-2" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 ml-2" />
                  نسخ
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 ml-2" />
              تحميل
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">جاري التحميل...</p>
              </div>
            </div>
          ) : useHighlighting ? (
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '14px',
                direction: 'ltr',
              }}
            >
              {content}
            </SyntaxHighlighter>
          ) : (
            <pre className="p-6 text-sm font-mono whitespace-pre-wrap break-words">
              {content}
            </pre>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
