"use client";

import { useState } from "react";

/** 페이지 전체에서 유일하게 JS가 필요한 부분이라 이 파일만 클라이언트 컴포넌트다. */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="rounded-md border border-zinc-700 px-2 py-1 text-[11px] text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
    >
      {copied ? "복사됨" : "복사"}
    </button>
  );
}
