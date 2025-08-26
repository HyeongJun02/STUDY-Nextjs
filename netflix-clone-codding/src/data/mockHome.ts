export type MediaItem = {
  id: string;
  title: string;
  detail: string;
  poster: string;   // 세로 포스터
  backdrop: string; // 가로 백드롭(히어로용)
};

export const HERO: MediaItem = {
  id: 'dont-look-up',
  title: '돈룩업',
  detail: '별다른 연구성과를 내지 못하던 천문학과 교수 랜들 민디와 그의 제자 케이트 디비아스키는 어느 날 상상을 초월하는 크기의 혜성이 지구를 향해 돌진하고 있다는 것을 알게 된다.',
  // 아무 웹 이미지 링크 사용 가능 (예시는 TMDB 표준 사이즈 경로)
  backdrop: 'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F12%2FNetflix-dont-look-up-new-character-poster-image-00.jpg?q=75&w=800&cbr=1&fit=max',
  poster:   'https://image.tmdb.org/t/p/w342/6oC2K9P6u1U0f0h5VnqQOe1Nqv2.jpg'
};

export const ROW_TOP10: MediaItem[] = [
  { id:'1', title:'작품1', poster:'https://image.tmdb.org/t/p/w342/1.jpg', backdrop:'', detail:'' },
  { id:'2', title:'작품2', poster:'https://image.tmdb.org/t/p/w342/2.jpg', backdrop:'', detail:'' },
  { id:'3', title:'작품3', poster:'https://image.tmdb.org/t/p/w342/3.jpg', backdrop:'', detail:'' },
  { id:'4', title:'작품4', poster:'https://image.tmdb.org/t/p/w342/4.jpg', backdrop:'', detail:'' },
  { id:'5', title:'작품5', poster:'https://image.tmdb.org/t/p/w342/5.jpg', backdrop:'', detail:'' },
  { id:'6', title:'작품6', poster:'https://image.tmdb.org/t/p/w342/6.jpg', backdrop:'', detail:'' },
  { id:'7', title:'작품7', poster:'https://image.tmdb.org/t/p/w342/7.jpg', backdrop:'', detail:'' },
  { id:'8', title:'작품8', poster:'https://image.tmdb.org/t/p/w342/8.jpg', backdrop:'', detail:'' },
  { id:'9', title:'작품9', poster:'https://image.tmdb.org/t/p/w342/9.jpg', backdrop:'', detail:'' },
  { id:'10', title:'작품10', poster:'https://image.tmdb.org/t/p/w342/10.jpg', backdrop:'', detail:'' },
];

export const ROW_CONTINUE: MediaItem[] = [
  { id:'a', title:'웬즈데이', poster:'https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABUAC9EWlFiqOqh7Q6KuMgzpugwCBsBZvDnfG-vm4EE8-yKUDgRnEEY4VkgHF39pwtib77ekvwQx1izTzYMAFNzSU4LMHUu05nKpOV2KrFhbsiM56MmVPFvzNkSo9Z55k5UJ64awcg4ZnoCdl_EEecpwVD99dhiz4tD0mY_0ewhuUw4vtGh09JNPDapZWT0BBtcYzaPQWp3U.jpg?r=bfa', backdrop:'', detail:'' },
  { id:'b', title:'기생충',   poster:'https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABbEMLH3v_rh8xnTLuxcSGnMaGe30Oo07oJNnGgso8rVC34hCP5-SSv8y838_aR5BMTYoFZdsleetf1XHYqlXeSgPfHlsmiz4qIU.webp?r=720', backdrop:'', detail:'' },
  { id:'c', title:'미스터션샤인', poster:'https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABZgbsQOs2PnybPcB1tyaEpYfzBi7WKzuckCA3zBdxN7ii5z3llt-rbAIv8QYYcVfnNzJr8-K3p8KEEhUscCYpdo9F5UWRarc-qE.webp?r=050', backdrop:'', detail:'' },
  { id:'d', title:'솔로지옥', poster:'https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABeXTGITfBq5ScPdPyFKDcOir8yIWsPp2KKBK_K83ioVCdU972YF0_3AUvT8jz8SAEzyCq5G21QjY7R-8-nbLhtvecWD91YKl5cA.webp?r=f62', backdrop:'', detail:'' },
];
