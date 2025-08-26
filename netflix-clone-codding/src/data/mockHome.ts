export type MediaItem = {
  id: string;
  title: string;
  poster: string;   // 세로 포스터
  backdrop: string; // 가로 백드롭(히어로용)
};

export const HERO: MediaItem = {
  id: 'runningman',
  title: '런닝맨',
  // 아무 웹 이미지 링크 사용 가능 (예시는 TMDB 표준 사이즈 경로)
  backdrop: 'https://image.tmdb.org/t/p/w1280/ogbVw0qj5vZx5lq7m1J1mHqKfpr.jpg',
  poster:   'https://image.tmdb.org/t/p/w342/6oC2K9P6u1U0f0h5VnqQOe1Nqv2.jpg'
};

export const ROW_TOP10: MediaItem[] = [
  { id:'1', title:'작품1', poster:'https://image.tmdb.org/t/p/w342/1.jpg', backdrop:'' },
  { id:'2', title:'작품2', poster:'https://image.tmdb.org/t/p/w342/2.jpg', backdrop:'' },
  { id:'3', title:'작품3', poster:'https://image.tmdb.org/t/p/w342/3.jpg', backdrop:'' },
  { id:'4', title:'작품4', poster:'https://image.tmdb.org/t/p/w342/4.jpg', backdrop:'' },
  { id:'5', title:'작품5', poster:'https://image.tmdb.org/t/p/w342/5.jpg', backdrop:'' },
  { id:'6', title:'작품6', poster:'https://image.tmdb.org/t/p/w342/6.jpg', backdrop:'' },
  { id:'7', title:'작품7', poster:'https://image.tmdb.org/t/p/w342/7.jpg', backdrop:'' },
  { id:'8', title:'작품8', poster:'https://image.tmdb.org/t/p/w342/8.jpg', backdrop:'' },
  { id:'9', title:'작품9', poster:'https://image.tmdb.org/t/p/w342/9.jpg', backdrop:'' },
  { id:'10', title:'작품10', poster:'https://image.tmdb.org/t/p/w342/10.jpg', backdrop:'' },
];

export const ROW_CONTINUE: MediaItem[] = [
  { id:'a', title:'에스콰이어', poster:'https://image.tmdb.org/t/p/w342/a.jpg', backdrop:'' },
  { id:'b', title:'기생충',   poster:'https://image.tmdb.org/t/p/w342/b.jpg', backdrop:'' },
  { id:'c', title:'나는 생존자다', poster:'https://image.tmdb.org/t/p/w342/c.jpg', backdrop:'' },
  { id:'d', title:'솔로지옥', poster:'https://image.tmdb.org/t/p/w342/d.jpg', backdrop:'' },
];
