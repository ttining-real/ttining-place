import S from "./Ready.module.scss";

function Ready() {
  return (
    <main className={S.ready}>
      <img
        src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Shooting%20Star.png'
        alt='Shooting Star'
        width='80'
        height='80'
      />
      <p>준비 중 입니다.</p>
      <a href='/'>메인 화면으로 돌아가기</a>
    </main>
  );
}

export default Ready;
