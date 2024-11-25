import S from "./TopButton.module.scss";
import PropTypes from "prop-types";

function TopButton({ scrollContainer }) {
  const scrollToTop = () => {
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth", // 부드러운 스크롤
      });
    }
  };

  return (
    <button onClick={scrollToTop} className={S.top_button}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M5 15L12 8L19 15'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  );
}

TopButton.propTypes = {
  scrollContainer: PropTypes.object.isRequired, // ref로 전달되는 DOM 요소의 타입은 object
};

export default TopButton;
