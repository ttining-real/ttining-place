export const generateRandomNickname = () => {
  const adjectives = [
    '행복한',
    '조용한',
    '반짝이는',
    '엉뚱한',
    '용감한',
    '차분한',
    '부드러운',
    '강한',
    '따뜻한',
    '까칠한',
    '고요한',
    '밝은',
    '깊은',
    '순수한',
    '열정적인',
    '청명한',
  ];
  const nouns = [
    '호랑이',
    '고슴도치',
    '토끼',
    '여우',
    '사자',
    '고양이',
    '강아지',
    '햄스터',
    '부엉이',
    '알파카',
    '팬더',
    '사슴',
    '다람쥐',
    '상어',
  ];

  // 무작위로 조합
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  const nickname = adjective + noun;

  // 최대 8자 이내로 자르기
  return nickname.slice(0, 8);
};
