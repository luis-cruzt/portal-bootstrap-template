import { useState } from 'react'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CssOutputProps {
  cssContent: string
}

export function CssOutput({ cssContent }: CssOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssContent)
    toast.success('CSS copied to clipboard')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon-sm"
        className="absolute right-2 top-2 z-10"
        onClick={handleCopy}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
      <pre className="max-h-96 overflow-auto rounded-lg border bg-muted p-4 pr-12 text-xs">
        <code>{cssContent}</code>
      </pre>
    </div>
  )
}
