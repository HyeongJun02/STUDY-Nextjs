"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRenderCount } from "@/lib/use-render-count";
import { signupSchema, type SignupInput } from "./schema";

/* ------------------------------------------------------------------ 공용 UI */

function Card({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {note && (
        <p className="mt-1 mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {note}
        </p>
      )}
      {children}
    </section>
  );
}

function Badge({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
        on
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
      }`}
    >
      {children}
    </span>
  );
}

const INPUT =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-hidden transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        {hint && <span className="text-[11px] text-zinc-400">{hint}</span>}
      </span>
      {children}
      {/* 에러 자리를 미리 잡아두면 에러가 뜰 때 레이아웃이 흔들리지 않는다 */}
      <span className="min-h-4 text-[11px] text-rose-500">{error ?? ""}</span>
    </label>
  );
}

/* --------------------------------------------- 1. 제어 vs 비제어 리렌더 비교 */

function ControlledMini() {
  const renders = useRenderCount();
  const [form, setForm] = useState({ email: "", nickname: "" });

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="mb-3 flex items-center justify-between">
        <code className="text-[11px] text-zinc-500">useState + value/onChange</code>
        <span className="rounded-full bg-rose-100 px-2 py-0.5 font-mono text-[11px] tabular-nums text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          render {renders}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <input
          className={INPUT}
          placeholder="이메일"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <input
          className={INPUT}
          placeholder="닉네임"
          value={form.nickname}
          onChange={(e) => setForm((f) => ({ ...f, nickname: e.target.value }))}
        />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
        글자 하나 칠 때마다 컴포넌트 전체가 다시 그려진다. 필드가 20개인 폼이면
        20개가 매 타이핑마다 같이 그려진다.
      </p>
    </div>
  );
}

function UncontrolledMini() {
  const renders = useRenderCount();
  const { register } = useForm<{ email: string; nickname: string }>();

  return (
    <div className="rounded-xl border border-emerald-300 p-4 dark:border-emerald-900">
      <div className="mb-3 flex items-center justify-between">
        <code className="text-[11px] text-zinc-500">react-hook-form + register</code>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[11px] tabular-nums text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          render {renders}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <input className={INPUT} placeholder="이메일" {...register("email")} />
        <input className={INPUT} placeholder="닉네임" {...register("nickname")} />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
        입력값을 DOM에 맡기고 ref로만 읽는다(비제어). 아무리 쳐도 리렌더가 없다.
        단, <code className="font-mono">watch()</code>로 값을 실시간으로 보면 그때는
        다시 리렌더된다.
      </p>
    </div>
  );
}

export function RenderCompare() {
  return (
    <Card
      title="1. 왜 react-hook-form 인가"
      note="양쪽 입력창에 똑같이 타이핑하면서 render 숫자를 비교해보세요."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <ControlledMini />
        <UncontrolledMini />
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------ 2. 회원가입 폼 */

type Result = { ok: boolean; text: string };

export function SignupForm() {
  const renders = useRenderCount();
  const [result, setResult] = useState<Result | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty, touchedFields },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema), // 검증은 전부 스키마가 한다
    mode: "onBlur", // 처음엔 칸을 떠날 때, 한 번 틀린 뒤엔 칠 때마다 검사
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
      agree: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const res = await fetch("/form/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();

    if (!res.ok) {
      // 서버가 돌려준 필드 에러를 그대로 해당 입력칸에 붙인다
      for (const [name, messages] of Object.entries(
        (json.fieldErrors ?? {}) as Record<string, string[]>,
      )) {
        setError(name as keyof SignupInput, { message: messages[0] });
      }
      setResult({ ok: false, text: `[${res.status}] ${JSON.stringify(json)}` });
      return;
    }

    setResult({ ok: true, text: `가입 완료 — ${json.user.nickname} (${json.user.email})` });
    reset();
  });

  return (
    <Card
      title="2. 실제 폼"
      note="일부러 틀리게 입력해보세요. 칸을 떠날 때 검사하고, 한 번 틀린 뒤부터는 칠 때마다 검사합니다."
    >
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <Badge on={isDirty}>isDirty</Badge>
        <Badge on={isValid}>isValid</Badge>
        <Badge on={isSubmitting}>isSubmitting</Badge>
        <Badge on={Object.keys(errors).length > 0}>
          errors {Object.keys(errors).length}
        </Badge>
        <Badge>touched {Object.keys(touchedFields).length}</Badge>
        <Badge>render {renders}</Badge>
      </div>

      <form onSubmit={onSubmit} noValidate className="grid gap-x-4 sm:grid-cols-2">
        <Field
          label="이메일"
          hint="taken@example.com 을 넣으면 서버가 거절합니다"
          error={errors.email?.message}
        >
          <input className={INPUT} placeholder="you@example.com" {...register("email")} />
        </Field>

        <Field label="닉네임" hint="2~10자" error={errors.nickname?.message}>
          <input className={INPUT} placeholder="자유롭게" {...register("nickname")} />
        </Field>

        <Field label="비밀번호" hint="8자 이상, 숫자 포함" error={errors.password?.message}>
          <input
            type="password"
            className={INPUT}
            placeholder="••••••••"
            {...register("password")}
          />
        </Field>

        <Field label="비밀번호 확인" error={errors.passwordConfirm?.message}>
          <input
            type="password"
            className={INPUT}
            placeholder="••••••••"
            {...register("passwordConfirm")}
          />
        </Field>

        <Field label="나이" hint="만 14세 이상" error={errors.age?.message}>
          <input
            type="number"
            className={INPUT}
            placeholder="20"
            // 이걸 빼면 문자열 "20"이 들어가서 스키마가 숫자가 아니라고 막는다
            {...register("age", { valueAsNumber: true })}
          />
        </Field>

        <div className="flex flex-col justify-center">
          <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              className="size-3.5 accent-emerald-600"
              {...register("agree")}
            />
            약관에 동의합니다
          </label>
          <span className="min-h-4 text-[11px] text-rose-500">
            {errors.agree?.message ?? ""}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {isSubmitting ? "보내는 중…" : "가입하기"}
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setResult(null);
            }}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            초기화
          </button>
        </div>
      </form>

      {result && (
        <p
          className={`mt-4 rounded-xl p-3 font-mono text-xs break-all ${
            result.ok
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
          }`}
        >
          {result.text}
        </p>
      )}
    </Card>
  );
}

/* --------------------------------------------------------- 3. 검증 우회 시도 */

export function BypassDemo() {
  const [res, setRes] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const send = async () => {
    setBusy(true);
    const r = await fetch("/form/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "not-an-email",
        nickname: "ㅋ",
        password: "123",
        passwordConfirm: "456",
        age: 8,
        agree: false,
      }),
    });
    setRes(`[${r.status}]\n${JSON.stringify(await r.json(), null, 2)}`);
    setBusy(false);
  };

  return (
    <Card
      title="3. 클라이언트 검증을 건너뛰면?"
      note="브라우저 검증은 사용자 편의일 뿐입니다. 아래 버튼은 폼을 통하지 않고 잘못된 데이터를 서버로 직접 보냅니다."
    >
      <button
        onClick={send}
        disabled={busy}
        className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs text-rose-600 transition hover:bg-rose-50 disabled:opacity-50 dark:border-rose-900 dark:hover:bg-rose-950/40"
      >
        {busy ? "보내는 중…" : "잘못된 데이터 직접 전송"}
      </button>

      {res && (
        <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 p-3 font-mono text-[12px] leading-relaxed text-emerald-300">
          {res}
        </pre>
      )}

      <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        서버가 <em className="not-italic text-zinc-900 dark:text-zinc-100">같은 스키마로</em>{" "}
        다시 검증해서 막아냅니다. 규칙을 한 곳에 뒀기 때문에 서버 쪽 검증을 따로
        짤 필요가 없었습니다.
      </p>
    </Card>
  );
}
