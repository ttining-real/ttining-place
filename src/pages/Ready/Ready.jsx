import S from "./Ready.module.scss";

function Ready() {
  return (
    <main className={S.ready}>
      <img src='/assets/icons/moon.svg' alt='' />
      <p>준비 중 입니다.</p>
      <a href='/'>메인 화면으로 돌아가기</a>
    </main>
  );
}

export default Ready;
