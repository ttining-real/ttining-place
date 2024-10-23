import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError() || {}; // useRouteError()가 null일 경우 빈 객체를 기본값으로 설정

  // 오류 객체의 속성을 안전하게 구조 분해 할당
  const {
    status = "알 수 없는 상태",
    statusText = "알 수 없는 오류",
    data = "추가 정보 없음",
  } = error;

  // console.log(useRouteError);
  console.error("오류 정보 : ", error);

  return (
    <main>
      <h1 className='hdg-lg'>
        <q>
          {status} {statusText}
        </q>
        <br />
        오류 발생!
      </h1>
      <p className='para-sm'>오류 발생 요인은 다음과 같습니다.</p>
      <code className='para-md'>{data}</code>
    </main>
  );
}

export default Error;
