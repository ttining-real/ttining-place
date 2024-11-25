import S from "./Test.module.scss";
import Loading from "@/components/App/Loading";

function Test() {
  return (
    <div className={S.test}>
      {/* <p>테스트 페이지</p> */}

      {/* <div className={S.typo}>
        <p className='hdg-xxl'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='hdg-xl'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='hdg-lg'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='hdg-md'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='hdg-sm'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='hdg-xs'>다람쥐 헌 쳇바퀴에 타고파</p>
        <hr />
        <p className='body-xl'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='body-lg'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='body-md'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='body-sm'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='body-xs'>다람쥐 헌 쳇바퀴에 타고파</p>
        <hr />
        <p className='lbl-xl'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='lbl-lg'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='lbl-md'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='lbl-sm'>다람쥐 헌 쳇바퀴에 타고파</p>
        <p className='lbl-xs'>다람쥐 헌 쳇바퀴에 타고파</p>
        <hr />
      </div> */}
      <Loading />
    </div>
  );
}

export default Test;
