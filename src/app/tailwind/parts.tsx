import { CopyButton } from "./copy-button";
import { toCode, type Demo, type Section } from "./demos";

/** 데이터 → 실제 화면. 아래 CodeBlock과 같은 데이터를 쓰므로 둘이 어긋나지 않는다. */
function Preview({ demo }: { demo: Demo }) {
  return (
    <div className={demo.container}>
      {demo.boxes.map((b, i) => {
        const key = `${b.cls}-${i}`;
        switch (b.tag) {
          case "input":
            return <input key={key} className={b.cls} placeholder={b.text} />;
          case "button":
            return (
              <button key={key} className={b.cls}>
                {b.text}
              </button>
            );
          case "p":
            return (
              <p key={key} className={b.cls}>
                {b.text}
              </p>
            );
          case "span":
            return (
              <span key={key} className={b.cls}>
                {b.text}
              </span>
            );
          default:
            return (
              <div key={key} className={b.cls}>
                {b.text}
              </div>
            );
        }
      })}
    </div>
  );
}

/** 따옴표 안(=클래스 문자열)만 색을 다르게 준다. 하이라이터 라이브러리까지는 필요 없다. */
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed">
      {code.split("\n").map((line, i) => (
        <div key={i}>
          {line.split('"').map((part, j) =>
            j % 2 === 1 ? (
              <span key={j} className="text-emerald-300">
                &quot;{part}&quot;
              </span>
            ) : (
              <span key={j} className="text-zinc-400">
                {part}
              </span>
            ),
          )}
        </div>
      ))}
    </pre>
  );
}

function DemoCard({ demo }: { demo: Demo }) {
  const code = toCode(demo);

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60">
      <header className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {demo.title}
        </h3>
        {demo.note && (
          <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {demo.note}
          </p>
        )}
      </header>

      <div className="bg-zinc-50 p-6 dark:bg-zinc-950/50">
        <Preview demo={demo} />
      </div>

      <div className="bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="font-mono text-[11px] text-zinc-500">JSX</span>
          <CopyButton text={code} />
        </div>
        <CodeBlock code={code} />
      </div>
    </article>
  );
}

export function SectionBlock({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-6">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {section.title}
      </h2>
      <p className="mt-1 mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {section.desc}
      </p>
      <div className="grid gap-4 xl:grid-cols-2">
        {section.demos.map((d) => (
          <DemoCard key={d.title} demo={d} />
        ))}
      </div>
    </section>
  );
}
