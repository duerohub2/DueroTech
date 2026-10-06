'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface CopyButtonProps {
  code: string;
  scriptId: string;
}

export function CopyButton({ code, scriptId }: CopyButtonProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1800);

      const supabase = createClient();
      await supabase.rpc('increment_copy_count', { p_script_id: scriptId });
      router.refresh();
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`brutal-btn w-full h-full py-5 text-base ${
        copied ? 'bg-brand-mint text-brand-ink' : 'bg-brand-yellow text-brand-ink'
      }`}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
