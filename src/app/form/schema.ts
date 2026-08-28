import { z } from "zod";

/**
 * 이 파일이 이 페이지의 핵심이다.
 * 같은 스키마를 브라우저(react-hook-form)와 서버(route handler)가 함께 쓴다.
 * 검증 규칙이 한 곳에만 있으므로 둘이 어긋날 수 없다.
 */
export const signupSchema = z
  .object({
    email: z.email("이메일 형식이 아닙니다"),
    nickname: z
      .string()
      .min(2, "2자 이상 입력해주세요")
      .max(10, "10자까지만 가능합니다"),
    password: z
      .string()
      .min(8, "8자 이상 입력해주세요")
      .regex(/[0-9]/, "숫자를 하나 이상 포함해주세요"),
    passwordConfirm: z.string(),
    age: z
      .number({ error: "나이를 숫자로 입력해주세요" })
      .int("정수로 입력해주세요")
      .min(14, "만 14세 이상만 가입할 수 있습니다")
      .max(120, "다시 확인해주세요"),
    agree: z.boolean().refine((v) => v, "약관에 동의해야 합니다"),
  })
  // 두 필드를 엮는 검증은 object 밖에서. path로 어느 필드에 에러를 붙일지 정한다.
  .refine((d) => d.password === d.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export type SignupInput = z.infer<typeof signupSchema>;

/** 서버만 알 수 있는 검증. 스키마로는 막을 수 없는 종류다. */
export const TAKEN_EMAILS = ["taken@example.com", "admin@example.com"];
