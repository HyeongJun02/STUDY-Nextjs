"use client";

import { useEffect, useId, useRef } from "react";

/** 키보드로 이동 가능한 요소들. 포커스를 가둘 범위를 정할 때 쓴다. */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * 라이브러리 없이 만든 모달.
 *
 * 모달이 "열리고 닫히는 것"은 쉽다. 접근성이 붙는 지점은 그 주변이다.
 *  1. 열면 포커스가 모달 안으로 들어간다
 *  2. Tab이 모달 밖으로 새어나가지 않는다 (포커스 트랩)
 *  3. Esc로 닫힌다
 *  4. 닫으면 열었던 버튼으로 포커스가 돌아간다
 *  5. 열려 있는 동안 뒤 배경이 스크롤되지 않는다
 *  6. 보조기기에 "이건 대화상자이고 제목은 이것"이라고 알린다
 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    // 4. 돌아갈 곳을 미리 기억해둔다 (모달을 연 그 버튼)
    const opener = document.activeElement as HTMLElement | null;

    // 5. 배경 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 1. 모달 안 첫 번째 요소로 포커스를 옮긴다
    const items = () => Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    (items()[0] ?? panel)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      // 3. Esc로 닫기
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // 2. 포커스 트랩: 끝에서 Tab을 누르면 처음으로, 처음에서 Shift+Tab이면 끝으로
      if (e.key !== "Tab") return;
      const list = items();
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경. 클릭하면 닫히지만, 키보드 사용자에게는 Esc가 그 역할을 한다.
          그래서 보조기기에는 숨기고(aria-hidden) 버튼으로도 만들지 않는다. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* 6. 여기가 대화상자이고, 제목은 aria-labelledby가 가리키는 그것이다 */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl outline-hidden dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2
          id={titleId}
          className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {title}
        </h2>

        <div className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {children}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            취소
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
