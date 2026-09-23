/** 12:34:56.789 — 서버가 언제 응답/렌더했는지 눈으로 비교하려고 쓴다. */
export const hhmmss = () => {
  const d = new Date();
  const p = (n: number, len = 2) => String(n).padStart(len, "0");
  // toLocaleTimeString은 Node에서 "12시 34분 56초"로 나온다. 직접 조립하는 게 확실하다.
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
};
