import { MdKeyboardArrowDown } from "react-icons/md";
import { PageAppearance } from "types/page-appearance.enum";
import style from "./dropdown-button.module.scss";
import { ButtonProps } from "types/use-dropdown-menu";

type DropdownButtonProps = {
  label?: string;
  isOpen: boolean;
  buttonProps: ButtonProps;
};

const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { isOpen, buttonProps, label } = props;
  return (
    <button
      {...buttonProps}
      className={`${style.dropdown__button} ${
        isOpen ? style["dropdown__button--open"] : ""
      } `}
    >
      {label}
      <span>
        <MdKeyboardArrowDown className={style["dropdown__button-icon"]} />
      </span>
    </button>
  );
};

export default DropdownButton;
