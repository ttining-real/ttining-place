import S from "./Dialog.module.scss";
import PropTypes from "prop-types";

function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={S.overlay} onClick={onClose}>
      <div className={S.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={S.closeButton} onClick={onClose} aria-label='Close'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dialog;
