import S from "./Loading.module.scss";

function Loading() {
  return (
    <section className={S.loading}>
      <img
        src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Hourglass%20Done.png'
        alt='Hourglass Done'
        width='80'
        height='80'
      />
      <p>잠시만 기다려주세요!</p>
    </section>
  );
}

export default Loading;
