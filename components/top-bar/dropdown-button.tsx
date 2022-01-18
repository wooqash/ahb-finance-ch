import { MdKeyboardArrowDown } from "react-icons/md";
import { PageAppearance } from "types/page-appearance.enum";
import style from "./dropdown-button.module.scss";
import { ButtonProps } from "types/use-dropdown-menu";

type DropdownButtonProps = {
    label?: string;
    isOpen: boolean;
    buttonProps: ButtonProps;
    appearance?: PageAppearance;
}
 
const DropdownButton:React.FC<DropdownButtonProps> = (props) => {
    const {isOpen, buttonProps, label, appearance} = props;
    return (
        <button {...buttonProps} className={`${style.dropdown__button} ${ isOpen ? style["dropdown__button--open"] : ''} ${appearance === PageAppearance.light ? style["dropdown__button--light"] : ''}`}>{label}<span><MdKeyboardArrowDown className={style["dropdown__button-icon"]} /></span></button>
    );
}
 
 
export default DropdownButton;