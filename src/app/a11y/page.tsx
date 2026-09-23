import { PageShell } from "@/components/page-shell";
import { ClickableDemo, LabelDemo, ModalDemo } from "./parts";

export const metadata = { title: "접근성 · 키보드와 보조기기" };

export default function A11yPage() {
  return (
    <PageShell
      title="접근성"
      desc="마우스를 치워두고 Tab 키로만 이 페이지를 돌아다녀 보세요. 어디에 포커스가 있는지 안 보이거나, 갈 수 없는 버튼이 있으면 그게 버그입니다."
    >
      <div className="flex flex-col gap-4">
        <ModalDemo />
        <ClickableDemo />
        <LabelDemo />
      </div>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          접근성을 챙기면 테스트가 쉬워진다
        </h2>
        <p className="mt-1 mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          덤처럼 따라오는 이득인데, 실제로는 이쪽이 더 크게 느껴질 때가 많습니다.
        </p>

        <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-4 font-mono text-[12px] leading-relaxed">
{`screen.getByRole("button", { name: "모달 열기" })   // 보조기기가 읽는 이름 그대로
screen.getByLabelText("이메일")                     // label이 연결돼 있어야 찾힌다
screen.getByRole("dialog")                          // role을 붙였으니 찾을 수 있다

container.querySelector(".btn-primary")             // 클래스명 바꾸면 깨진다`}
        </pre>

        <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Testing Library는 <strong>사용자가 화면을 인식하는 방식</strong>으로 요소를
          찾습니다. 그래서 <code className="font-mono">getByRole</code>이나{" "}
          <code className="font-mono">getByLabelText</code>로 못 찾는 요소는, 스크린리더도
          제대로 읽지 못하는 요소입니다. 테스트가 접근성 검사를 겸하는 셈입니다.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          이 페이지의 모달도 그렇게 테스트했습니다 —{" "}
          <code className="font-mono">src/app/a11y/modal.test.tsx</code>에서 Tab 순환,
          Esc 닫기, 포커스 복귀를 전부 확인합니다.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          당장 지킬 수 있는 것들
        </h2>
        <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
          {[
            "누르는 건 button, 이동하는 건 a",
            "입력칸에는 label을 연결한다",
            "포커스 링을 지우지 않는다 (outline-none 금지)",
            "이미지에는 alt, 장식이면 alt=''",
            "색만으로 정보를 전달하지 않는다",
            "글자와 배경의 대비를 확보한다",
            "모달을 열면 포커스를 옮기고, 닫으면 되돌린다",
            "아이콘만 있는 버튼에는 aria-label을 붙인다",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-emerald-500">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-zinc-400">
        코드: <code className="font-mono">src/app/a11y/modal.tsx</code> — 포커스 트랩·Esc·
        스크롤 잠금·포커스 복귀가 전부 <code className="font-mono">useEffect</code> 하나
        안에 있습니다. 의존성 없이 60줄입니다.
      </p>
    </PageShell>
  );
}
