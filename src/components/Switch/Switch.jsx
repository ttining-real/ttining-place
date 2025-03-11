import { bool, func, string } from "prop-types";

import $ from "./Switch.module.scss";

function Switch({ label, labelId, checked, onChange }) {
  return (
    <div className={$.switch_checkbox}>
      <label id={labelId}>
        <input
          role='switch'
          type='checkbox'
          aria-labelledby={labelId}
          aria-checked={checked}
          checked={checked}
          className={$.checkbox}
          onChange={onChange}
        />
        <span className='body'>{label}</span>
      </label>
    </div>
  );
}

Switch.propTypes = {
  label: string.isRequired,
  labelId: string.isRequired,
  checked: bool.isRequired,
  onChange: func.isRequired,
};

export default Switch;
