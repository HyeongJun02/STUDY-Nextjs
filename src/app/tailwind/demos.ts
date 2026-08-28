/**
 * 예제를 "데이터"로만 적는다.
 * 화면에 그려지는 요소와 아래에 표시되는 코드가 이 한 곳에서 같이 생성되므로
 * 둘이 어긋날 수가 없다 (JSX 따로, 코드 문자열 따로 쓰면 반드시 어긋난다).
 */
export type Box = {
  cls: string;
  text?: string;
  tag?: "div" | "button" | "input" | "p" | "span";
};

export type Demo = {
  title: string;
  note?: string;
  container: string;
  boxes: Box[];
};

export type Section = {
  id: string;
  title: string;
  desc: string;
  demos: Demo[];
};

/** 데모 데이터 → 화면에 보여줄 JSX 코드 문자열 */
export function toCode(d: Demo): string {
  const lines = [`<div className="${d.container}">`];
  for (const b of d.boxes) {
    const tag = b.tag ?? "div";
    if (tag === "input") {
      lines.push(`  <input className="${b.cls}" placeholder="${b.text ?? ""}" />`);
    } else {
      lines.push(`  <${tag} className="${b.cls}">${b.text ?? ""}</${tag}>`);
    }
  }
  lines.push("</div>");
  return lines.join("\n");
}

const BOX = "grid size-12 place-items-center rounded-lg bg-emerald-500 text-xs text-white";
const CANVAS = "rounded-lg bg-white p-3 dark:bg-zinc-900";

export const SECTIONS: Section[] = [
  {
    id: "layout",
    title: "레이아웃",
    desc: "flex와 grid. Tailwind에서 제일 많이 쓰는 부분이고, 나머지는 대부분 이 위에 얹힌다.",
    demos: [
      {
        title: "flex + gap",
        note: "가로로 늘어놓고 간격 주기. gap-3 = 0.75rem = 12px.",
        container: "flex gap-3",
        boxes: [
          { cls: BOX, text: "1" },
          { cls: BOX, text: "2" },
          { cls: BOX, text: "3" },
        ],
      },
      {
        title: "justify-between",
        note: "주축(가로) 정렬. start / center / end / between / around / evenly.",
        container: `flex justify-between ${CANVAS}`,
        boxes: [
          { cls: BOX, text: "←" },
          { cls: BOX, text: "·" },
          { cls: BOX, text: "→" },
        ],
      },
      {
        title: "items-center",
        note: "교차축(세로) 정렬. 높이가 제각각일 때 차이가 보인다.",
        container: `flex items-center gap-3 ${CANVAS}`,
        boxes: [
          { cls: "w-12 rounded-lg bg-emerald-500 py-2", text: "" },
          { cls: "w-12 rounded-lg bg-emerald-500 py-6", text: "" },
          { cls: "w-12 rounded-lg bg-emerald-500 py-4", text: "" },
        ],
      },
      {
        title: "flex-1 로 남은 공간 채우기",
        note: "고정폭 사이드바 + 가변폭 본문을 만들 때 쓰는 그 패턴.",
        container: `flex gap-3 ${CANVAS}`,
        boxes: [
          { cls: "w-16 rounded-lg bg-zinc-300 p-3 text-xs dark:bg-zinc-700", text: "w-16" },
          { cls: "flex-1 rounded-lg bg-emerald-500 p-3 text-xs text-white", text: "flex-1" },
        ],
      },
      {
        title: "grid-cols-3",
        note: "칸 수를 정하면 나머지는 알아서. 반응형은 sm:grid-cols-2 처럼 붙인다.",
        container: "grid grid-cols-3 gap-3",
        boxes: [
          { cls: BOX, text: "1" },
          { cls: BOX, text: "2" },
          { cls: BOX, text: "3" },
          { cls: BOX, text: "4" },
          { cls: BOX, text: "5" },
          { cls: BOX, text: "6" },
        ],
      },
      {
        title: "col-span 으로 칸 합치기",
        container: "grid grid-cols-4 gap-3",
        boxes: [
          { cls: "col-span-2 grid h-12 place-items-center rounded-lg bg-emerald-600 text-xs text-white", text: "col-span-2" },
          { cls: BOX, text: "3" },
          { cls: BOX, text: "4" },
        ],
      },
    ],
  },

  {
    id: "spacing",
    title: "간격과 크기",
    desc: "숫자 1 = 0.25rem = 4px. p-4는 16px. 이 환산만 외우면 절반은 끝난다.",
    demos: [
      {
        title: "padding 크기 비교",
        container: "flex items-start gap-3",
        boxes: [
          { cls: "rounded-lg bg-emerald-500/20 p-2 text-xs text-emerald-800 dark:text-emerald-200", text: "p-2 · 8px" },
          { cls: "rounded-lg bg-emerald-500/20 p-4 text-xs text-emerald-800 dark:text-emerald-200", text: "p-4 · 16px" },
          { cls: "rounded-lg bg-emerald-500/20 p-8 text-xs text-emerald-800 dark:text-emerald-200", text: "p-8 · 32px" },
        ],
      },
      {
        title: "size-* 로 정사각형",
        note: "v3의 w-12 h-12를 v4에서는 size-12 한 개로 줄일 수 있다.",
        container: "flex items-end gap-3",
        boxes: [
          { cls: "size-8 rounded-lg bg-emerald-500", text: "" },
          { cls: "size-12 rounded-lg bg-emerald-500", text: "" },
          { cls: "size-16 rounded-lg bg-emerald-500", text: "" },
        ],
      },
      {
        title: "분수 너비",
        note: "w-1/2, w-1/3 … 부모 기준 비율.",
        container: `flex flex-col gap-2 ${CANVAS}`,
        boxes: [
          { cls: "w-full rounded bg-emerald-500 p-2 text-xs text-white", text: "w-full" },
          { cls: "w-1/2 rounded bg-emerald-500 p-2 text-xs text-white", text: "w-1/2" },
          { cls: "w-1/4 rounded bg-emerald-500 p-2 text-xs text-white", text: "w-1/4" },
        ],
      },
      {
        title: "space-y-* : 자식 사이에만 간격",
        note: "gap과 달리 첫/마지막 요소 바깥에는 여백이 안 붙는다.",
        container: `space-y-2 ${CANVAS}`,
        boxes: [
          { cls: "rounded bg-emerald-500/30 p-2 text-xs", text: "첫째" },
          { cls: "rounded bg-emerald-500/30 p-2 text-xs", text: "둘째" },
          { cls: "rounded bg-emerald-500/30 p-2 text-xs", text: "셋째" },
        ],
      },
    ],
  },

  {
    id: "typography",
    title: "타이포그래피",
    desc: "글자 크기·굵기·자간·행간, 그리고 넘칠 때 자르는 법.",
    demos: [
      {
        title: "글자 크기",
        container: "flex flex-col gap-1",
        boxes: [
          { tag: "p", cls: "text-xs", text: "text-xs · 12px" },
          { tag: "p", cls: "text-sm", text: "text-sm · 14px" },
          { tag: "p", cls: "text-base", text: "text-base · 16px" },
          { tag: "p", cls: "text-xl", text: "text-xl · 20px" },
          { tag: "p", cls: "text-3xl", text: "text-3xl · 30px" },
        ],
      },
      {
        title: "굵기와 자간",
        container: "flex flex-col gap-1",
        boxes: [
          { tag: "p", cls: "font-light", text: "font-light 가벼움" },
          { tag: "p", cls: "font-medium", text: "font-medium 보통보다 살짝" },
          { tag: "p", cls: "font-bold", text: "font-bold 굵게" },
          { tag: "p", cls: "font-bold tracking-tight", text: "tracking-tight 자간 좁게" },
          { tag: "p", cls: "font-bold tracking-widest", text: "tracking-widest 자간 넓게" },
        ],
      },
      {
        title: "행간 (leading)",
        container: "grid gap-3 sm:grid-cols-2",
        boxes: [
          { tag: "p", cls: `text-xs leading-tight ${CANVAS}`, text: "leading-tight. 줄 간격이 좁아 촘촘하게 보인다. 제목이나 짧은 문구에 어울린다." },
          { tag: "p", cls: `text-xs leading-loose ${CANVAS}`, text: "leading-loose. 줄 간격이 넓어 읽기 편하다. 긴 본문에 어울린다." },
        ],
      },
      {
        title: "truncate / line-clamp",
        note: "한 줄로 자르기(…) vs 지정한 줄 수에서 자르기.",
        container: "grid gap-3 sm:grid-cols-2",
        boxes: [
          { tag: "p", cls: `truncate text-xs ${CANVAS}`, text: "truncate는 한 줄을 넘기면 말줄임표로 잘라낸다. 이 문장은 분명히 한 줄보다 길다." },
          { tag: "p", cls: `line-clamp-2 text-xs ${CANVAS}`, text: "line-clamp-2는 두 줄까지만 보여주고 나머지를 잘라낸다. 카드 목록의 설명문에 자주 쓰인다. 이 문장은 두 줄을 넘기기 위해 충분히 길게 적었다." },
        ],
      },
    ],
  },

  {
    id: "color",
    title: "색과 배경",
    desc: "색 이름 + 50~950 밝기. 투명도는 슬래시로 붙인다.",
    demos: [
      {
        title: "밝기 스케일",
        container: "flex flex-wrap gap-2",
        boxes: [
          { cls: "grid size-12 place-items-center rounded bg-emerald-100 text-[10px] text-emerald-900", text: "100" },
          { cls: "grid size-12 place-items-center rounded bg-emerald-300 text-[10px] text-emerald-900", text: "300" },
          { cls: "grid size-12 place-items-center rounded bg-emerald-500 text-[10px] text-white", text: "500" },
          { cls: "grid size-12 place-items-center rounded bg-emerald-700 text-[10px] text-white", text: "700" },
          { cls: "grid size-12 place-items-center rounded bg-emerald-900 text-[10px] text-white", text: "900" },
        ],
      },
      {
        title: "투명도는 슬래시",
        note: "bg-emerald-500/30. v3의 bg-opacity-30은 v4에서 사라졌다.",
        container: "flex gap-2",
        boxes: [
          { cls: "grid size-12 place-items-center rounded bg-emerald-500/10 text-[10px]", text: "/10" },
          { cls: "grid size-12 place-items-center rounded bg-emerald-500/30 text-[10px]", text: "/30" },
          { cls: "grid size-12 place-items-center rounded bg-emerald-500/60 text-[10px] text-white", text: "/60" },
          { cls: "grid size-12 place-items-center rounded bg-emerald-500 text-[10px] text-white", text: "100%" },
        ],
      },
      {
        title: "그라데이션",
        note: "v4에서 bg-gradient-to-r → bg-linear-to-r 로 이름이 바뀌었다 (옛 이름도 아직 동작).",
        container: "flex flex-col gap-2",
        boxes: [
          { cls: "h-12 rounded-lg bg-linear-to-r from-emerald-500 to-sky-500", text: "" },
          { cls: "h-12 rounded-lg bg-linear-to-br from-amber-400 via-rose-500 to-purple-600", text: "" },
        ],
      },
      {
        title: "글자에 그라데이션 입히기",
        note: "배경을 글자 모양으로 잘라내는 흔한 트릭.",
        container: "flex",
        boxes: [
          {
            tag: "p",
            cls: "bg-linear-to-r from-emerald-500 to-sky-500 bg-clip-text text-3xl font-bold text-transparent",
            text: "Gradient Text",
          },
        ],
      },
    ],
  },

  {
    id: "border",
    title: "테두리 · 모서리 · 그림자",
    desc: "카드 UI를 만드는 재료들.",
    demos: [
      {
        title: "모서리 둥글기",
        container: "flex flex-wrap gap-3",
        boxes: [
          { cls: "grid size-14 place-items-center rounded-none bg-emerald-500 text-[10px] text-white", text: "none" },
          { cls: "grid size-14 place-items-center rounded bg-emerald-500 text-[10px] text-white", text: "rounded" },
          { cls: "grid size-14 place-items-center rounded-xl bg-emerald-500 text-[10px] text-white", text: "xl" },
          { cls: "grid size-14 place-items-center rounded-3xl bg-emerald-500 text-[10px] text-white", text: "3xl" },
          { cls: "grid size-14 place-items-center rounded-full bg-emerald-500 text-[10px] text-white", text: "full" },
        ],
      },
      {
        title: "테두리",
        container: "flex flex-wrap gap-3",
        boxes: [
          { cls: "grid size-16 place-items-center rounded-lg border border-zinc-400 text-[10px]", text: "border" },
          { cls: "grid size-16 place-items-center rounded-lg border-2 border-emerald-500 text-[10px]", text: "border-2" },
          { cls: "grid size-16 place-items-center rounded-lg border-2 border-dashed border-emerald-500 text-[10px]", text: "dashed" },
          { cls: "grid size-16 place-items-center rounded-lg border-l-4 border-emerald-500 bg-emerald-500/10 text-[10px]", text: "border-l-4" },
        ],
      },
      {
        title: "그림자",
        note: "v4에서 한 단계씩 밀렸다. 예전 shadow-sm → 지금 shadow-xs, 예전 shadow → 지금 shadow-sm.",
        container: "flex flex-wrap gap-4 rounded-lg bg-white p-4 dark:bg-zinc-900",
        boxes: [
          { cls: "grid size-16 place-items-center rounded-lg bg-white text-[10px] shadow-xs dark:bg-zinc-800", text: "xs" },
          { cls: "grid size-16 place-items-center rounded-lg bg-white text-[10px] shadow-sm dark:bg-zinc-800", text: "sm" },
          { cls: "grid size-16 place-items-center rounded-lg bg-white text-[10px] shadow-md dark:bg-zinc-800", text: "md" },
          { cls: "grid size-16 place-items-center rounded-lg bg-white text-[10px] shadow-lg dark:bg-zinc-800", text: "lg" },
          { cls: "grid size-16 place-items-center rounded-lg bg-white text-[10px] shadow-xl dark:bg-zinc-800", text: "xl" },
        ],
      },
      {
        title: "ring : 레이아웃을 안 밀어내는 테두리",
        note: "border와 달리 바깥쪽에 그려져서 크기가 안 변한다. 포커스 표시에 쓴다.",
        container: `flex gap-6 ${CANVAS}`,
        boxes: [
          { cls: "grid size-16 place-items-center rounded-lg bg-emerald-500 text-[10px] text-white ring-2 ring-emerald-300", text: "ring-2" },
          { cls: "grid size-16 place-items-center rounded-lg bg-emerald-500 text-[10px] text-white ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900", text: "offset-2" },
        ],
      },
    ],
  },

  {
    id: "state",
    title: "상태 변형",
    desc: "hover: focus: 처럼 앞에 붙이는 접두사. 마우스를 올려보고 클릭해보자.",
    demos: [
      {
        title: "hover / active",
        note: "실제로 올려보고 눌러볼 것.",
        container: "flex flex-wrap gap-3",
        boxes: [
          { tag: "button", cls: "rounded-lg bg-emerald-500 px-4 py-2 text-sm text-white hover:bg-emerald-600", text: "hover:bg-emerald-600" },
          { tag: "button", cls: "rounded-lg bg-emerald-500 px-4 py-2 text-sm text-white active:scale-95", text: "active:scale-95" },
          { tag: "button", cls: "rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700", text: "테두리·글자색 동시에" },
        ],
      },
      {
        title: "focus : 키보드로 Tab 눌러보기",
        container: "flex flex-wrap gap-3",
        boxes: [
          { tag: "input", cls: "rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-900", text: "클릭하거나 Tab" },
        ],
      },
      {
        title: "group-hover : 부모에 올리면 자식이 반응",
        note: "부모에 group, 자식에 group-hover:*. 카드 전체 hover에 화살표만 움직이게 할 때 쓴다.",
        container: "group flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 p-4 transition hover:border-emerald-500 dark:border-zinc-700",
        boxes: [
          { cls: "text-sm text-zinc-500 group-hover:text-emerald-600", text: "카드 아무 데나 올려보세요" },
          { cls: "text-zinc-300 transition group-hover:translate-x-1 group-hover:text-emerald-500", text: "→" },
        ],
      },
      {
        title: "peer : 형제 요소의 상태에 반응",
        note: "앞선 형제에 peer, 뒤 요소에 peer-focus:*. 입력창에 포커스해보자.",
        container: "flex flex-col gap-2",
        boxes: [
          { tag: "input", cls: "peer rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-hidden dark:border-zinc-700 dark:bg-zinc-900", text: "여기에 포커스" },
          { tag: "p", cls: "text-xs text-zinc-400 peer-focus:font-medium peer-focus:text-emerald-600", text: "입력창이 포커스되면 이 글자가 바뀝니다" },
        ],
      },
    ],
  },

  {
    id: "responsive",
    title: "반응형과 다크모드",
    desc: "sm: md: lg: 는 '이 크기 이상에서'. 기본값은 항상 모바일 쪽이다.",
    demos: [
      {
        title: "창 너비를 줄였다 늘려보기",
        note: "기본은 세로, sm(640px) 이상에서 가로로 바뀐다.",
        container: `flex flex-col gap-3 sm:flex-row ${CANVAS}`,
        boxes: [
          { cls: "flex-1 rounded-lg bg-emerald-500 p-3 text-xs text-white", text: "A" },
          { cls: "flex-1 rounded-lg bg-emerald-500 p-3 text-xs text-white", text: "B" },
          { cls: "flex-1 rounded-lg bg-emerald-500 p-3 text-xs text-white", text: "C" },
        ],
      },
      {
        title: "구간마다 칸 수 바꾸기",
        container: "grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6",
        boxes: Array.from({ length: 6 }, (_, i) => ({
          cls: "grid h-12 place-items-center rounded-lg bg-emerald-500 text-xs text-white",
          text: String(i + 1),
        })),
      },
      {
        title: "특정 크기에서만 보이기",
        container: `flex gap-3 ${CANVAS}`,
        boxes: [
          { cls: "rounded bg-zinc-200 p-2 text-xs dark:bg-zinc-700", text: "항상 보임" },
          { cls: "hidden rounded bg-emerald-500 p-2 text-xs text-white md:block", text: "md 이상에서만" },
          { cls: "rounded bg-rose-500 p-2 text-xs text-white md:hidden", text: "md 미만에서만" },
        ],
      },
      {
        title: "dark: 다크모드",
        note: "OS 설정을 따라간다. 시스템 테마를 바꾸면 아래 색이 뒤집힌다.",
        container: "flex gap-3",
        boxes: [
          { cls: "rounded-lg bg-zinc-100 p-4 text-xs text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100", text: "배경·글자 반전" },
          { cls: "rounded-lg border border-zinc-300 p-4 text-xs dark:border-emerald-500 dark:text-emerald-400", text: "다크에서만 강조" },
        ],
      },
    ],
  },

  {
    id: "motion",
    title: "변형과 애니메이션",
    desc: "transform, transition, animate. transition을 빼면 뚝뚝 끊긴다.",
    demos: [
      {
        title: "transform",
        container: `flex flex-wrap items-center gap-6 ${CANVAS}`,
        boxes: [
          { cls: "grid size-14 place-items-center rounded-lg bg-emerald-500 text-[10px] text-white rotate-6", text: "rotate-6" },
          { cls: "grid size-14 place-items-center rounded-lg bg-emerald-500 text-[10px] text-white scale-125", text: "scale-125" },
          { cls: "grid size-14 place-items-center rounded-lg bg-emerald-500 text-[10px] text-white -translate-y-2", text: "-y-2" },
          { cls: "grid size-14 place-items-center rounded-lg bg-emerald-500 text-[10px] text-white skew-x-12", text: "skew-x-12" },
        ],
      },
      {
        title: "transition 있고 없고",
        note: "둘 다 올려보면 차이가 확실하다.",
        container: "flex flex-wrap gap-3",
        boxes: [
          { tag: "button", cls: "rounded-lg bg-zinc-300 px-4 py-2 text-sm hover:bg-emerald-500 hover:text-white dark:bg-zinc-700", text: "없음 (뚝)" },
          { tag: "button", cls: "rounded-lg bg-zinc-300 px-4 py-2 text-sm transition-colors duration-500 hover:bg-emerald-500 hover:text-white dark:bg-zinc-700", text: "duration-500 (스르륵)" },
          { tag: "button", cls: "rounded-lg bg-emerald-500 px-4 py-2 text-sm text-white transition hover:-translate-y-1 hover:shadow-lg", text: "떠오르기" },
        ],
      },
      {
        title: "내장 애니메이션",
        note: "따로 keyframes를 안 써도 되는 네 가지.",
        container: `flex items-center gap-8 ${CANVAS}`,
        boxes: [
          { cls: "size-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent", text: "" },
          { cls: "size-8 animate-pulse rounded-lg bg-emerald-500", text: "" },
          { cls: "size-8 animate-bounce rounded-full bg-emerald-500", text: "" },
          { cls: "size-8 animate-ping rounded-full bg-emerald-500", text: "" },
        ],
      },
    ],
  },

  {
    id: "effect",
    title: "필터와 기타",
    desc: "블러, 비율 고정, 넘침 처리처럼 가끔 필요한데 매번 검색하게 되는 것들.",
    demos: [
      {
        title: "블러와 그레이스케일",
        container: "flex gap-3",
        boxes: [
          { cls: "size-16 rounded-lg bg-linear-to-br from-emerald-400 to-sky-500", text: "" },
          { cls: "size-16 rounded-lg bg-linear-to-br from-emerald-400 to-sky-500 blur-sm", text: "" },
          { cls: "size-16 rounded-lg bg-linear-to-br from-emerald-400 to-sky-500 grayscale", text: "" },
          { cls: "size-16 rounded-lg bg-linear-to-br from-emerald-400 to-sky-500 opacity-30", text: "" },
        ],
      },
      {
        title: "aspect : 비율 고정",
        note: "썸네일·동영상 자리를 잡을 때. 높이를 직접 계산할 필요가 없다.",
        container: "grid grid-cols-3 gap-3",
        boxes: [
          { cls: "grid aspect-square place-items-center rounded-lg bg-emerald-500 text-xs text-white", text: "square" },
          { cls: "grid aspect-video place-items-center rounded-lg bg-emerald-500 text-xs text-white", text: "video 16/9" },
          { cls: "grid aspect-[3/4] place-items-center rounded-lg bg-emerald-500 text-xs text-white", text: "3/4" },
        ],
      },
      {
        title: "overflow-hidden",
        note: "부모 밖으로 나가는 부분을 잘라낸다. rounded와 함께 자주 쓴다.",
        container: "flex gap-3",
        boxes: [
          { cls: "h-16 w-24 overflow-hidden rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700", text: "잘림. 이 글자는 상자보다 길어서 넘치는 부분이 보이지 않는다." },
          { cls: "h-16 w-24 overflow-y-auto rounded-lg bg-zinc-200 p-1 text-xs dark:bg-zinc-700", text: "스크롤. 이 상자는 넘치는 내용을 스크롤로 볼 수 있게 한다. 아래로 내려보자." },
        ],
      },
    ],
  },

  {
    id: "arbitrary",
    title: "임의 값",
    desc: "정해진 눈금에 없는 값이 필요할 때. 대괄호 안에 CSS 값을 그대로 쓴다.",
    demos: [
      {
        title: "숫자·색을 직접 지정",
        note: "남용하면 Tailwind를 쓰는 의미가 없어지니, 눈금으로 안 되는 경우에만.",
        container: "flex flex-wrap items-end gap-3",
        boxes: [
          { cls: "grid h-12 w-[137px] place-items-center rounded-lg bg-emerald-500 text-[10px] text-white", text: "w-[137px]" },
          { cls: "grid size-12 place-items-center rounded-lg bg-[#f43f5e] text-[10px] text-white", text: "#f43f5e" },
          { cls: "grid size-12 place-items-center rounded-[14px] bg-emerald-500 text-[10px] text-white", text: "[14px]" },
        ],
      },
      {
        title: "CSS 변수와 계산식",
        note: "calc()도 그대로 넣을 수 있다. 공백은 밑줄(_)로 쓴다.",
        container: "flex flex-col gap-2",
        boxes: [
          { cls: "rounded-lg bg-emerald-500 p-2 text-xs text-white w-[calc(100%-4rem)]", text: "w-[calc(100%-4rem)]" },
          { cls: "rounded-lg bg-emerald-500 p-2 text-xs text-white shadow-[0_8px_24px_rgba(16,185,129,0.5)]", text: "그림자를 직접 지정" },
        ],
      },
    ],
  },
];
