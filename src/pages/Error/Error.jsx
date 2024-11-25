import { Link } from "react-router-dom";
import S from "./Error.module.scss";
import { useRouteError } from "react-router-dom";

function Error() {
  // useRouteError()가 null일 경우 빈 객체를 기본값으로 설정
  const error = useRouteError() || {};

  // 오류 객체 속성
  const {
    status = "알 수 없는 상태",
    statusText = "알 수 없는 오류",
    data = error.message || "추가 정보 없음",
  } = error;

  // console.log(useRouteError);
  // console.error("오류 정보 : ", error);

  return (
    <main className={S.error}>
      <section>
        <h1>오류가 발생했습니다.</h1>
        <p aria-live='assertive'>
          {status && <span className={S.status}>상태 코드: {status}</span>}
          {statusText && (
            <span className={S.statusText}>상태 메시지: {statusText}</span>
          )}
        </p>
        <img
          src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Blowfish.png'
          alt='Blowfish'
          width='80'
          height='80'
          aria-hidden
        />
      </section>
      <div className={S.desc}>
        <p>오류 발생 요인은 다음과 같습니다.</p>
        <p>{data}</p>
      </div>
      <Link to='/' aria-label='홈페이지로 이동'>
        Home으로 돌아가기
      </Link>
    </main>
  );
}

export default Error;
