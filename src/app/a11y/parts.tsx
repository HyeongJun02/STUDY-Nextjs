"use client";

import { useState } from "react";
import { Card } from "@/components/card";
import { Modal } from "./modal";

const CHECKS = [
  ["열면 포커스가 모달 안으로", "Tab을 눌러보세요. 커서가 이미 모달 안에 있습니다."],
  ["Tab이 밖으로 새지 않음", "계속 Tab을 누르면 취소 → 확인 → 다시 취소로 돕니다."],
  ["Esc로 닫기", "마우스를 쓰지 않고 빠져나올 수 있어야 합니다."],
  ["닫으면 원래 버튼으로 복귀", "닫은 뒤 Tab을 눌러보면 열었던 버튼 다음부터 이어집니다."],
  ["배경 스크롤 잠금", "열린 채로 마우스 휠을 굴려보세요. 뒤가 밀리지 않습니다."],
];

export function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Card
      title="1. 라이브러리 없이 만든 모달"
      note="마우스를 치워두고 키보드로만 조작해보세요. Tab · Shift+Tab · Enter · Esc 만 쓰면 됩니다."
    >
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700"
      >
        모달 열기
      </button>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {CHECKS.map(([what, how]) => (
          <li
            key={what}
            className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
          >
            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{what}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">{how}</p>
          </li>
        ))}
      </ul>

      <Modal open={open} onClose={() => setOpen(false)} title="정말 삭제할까요?">
        지운 뒤에는 되돌릴 수 없습니다. 이 모달 안에서 Tab을 계속 눌러보세요 — 포커스가
        바깥으로 나가지 않습니다.
      </Modal>
    </Card>
  );
}

export function ClickableDemo() {
  const [divCount, setDivCount] = useState(0);
  const [buttonCount, setButtonCount] = useState(0);

  return (
    <Card
      title="2. div 에 onClick 을 달면 안 되는 이유"
      note="마우스로는 둘 다 눌립니다. 이제 마우스를 놓고 Tab 키로만 가보세요."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-rose-300 p-4 dark:border-rose-900">
          <code className="text-[11px] text-zinc-500">{"<div onClick>"}</code>
          {/* 일부러 잘못 만든 예시다. 실제 코드에 이렇게 쓰면 안 된다.
              (이 프로젝트의 eslint에는 jsx-a11y 규칙이 켜져 있지 않아 그냥 통과한다 —
               도구가 다 잡아주지는 않는다는 뜻이기도 하다) */}
          <div
            onClick={() => setDivCount((n) => n + 1)}
            className="mt-2 cursor-pointer rounded-lg bg-rose-500 px-4 py-2 text-center text-sm text-white"
          >
            눌러보기 ({divCount})
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
            Tab으로 도달할 수 없고, 도달해도 Enter가 먹지 않습니다. 스크린리더는 이것을
            버튼이라고 읽지 않습니다.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-300 p-4 dark:border-emerald-900">
          <code className="text-[11px] text-zinc-500">{"<button onClick>"}</code>
          <button
            onClick={() => setButtonCount((n) => n + 1)}
            className="mt-2 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white"
          >
            눌러보기 ({buttonCount})
          </button>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
            Tab으로 도달하고, Enter와 Space 둘 다 동작하고, 포커스 링이 보이고, 보조기기가
            &quot;버튼&quot;이라고 읽습니다. 전부 공짜로 따라옵니다.
          </p>
        </div>
      </div>
    </Card>
  );
}

export function LabelDemo() {
  return (
    <Card
      title="3. placeholder 는 라벨이 아니다"
      note="둘 다 화면에는 '이메일'이라고 보입니다. 입력을 시작하면 차이가 드러납니다."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-rose-300 p-4 dark:border-rose-900">
          <code className="text-[11px] text-zinc-500">placeholder 만</code>
          <input
            placeholder="이메일"
            aria-label="이메일 (나쁜 예시)"
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
            글자를 치는 순간 &quot;이메일&quot;이라는 안내가 사라집니다. 무엇을 입력하던
            칸인지 확인할 방법이 없어집니다.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-300 p-4 dark:border-emerald-900">
          <code className="text-[11px] text-zinc-500">{"<label htmlFor>"}</code>
          <label
            htmlFor="a11y-email"
            className="mt-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
          >
            이메일
          </label>
          <input
            id="a11y-email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
            안내가 사라지지 않고, <strong>라벨을 클릭하면 입력칸이 포커스</strong>됩니다.
            클릭 영역이 넓어져 손이 불편한 사용자에게도 유리합니다.
          </p>
        </div>
      </div>
    </Card>
  );
}
