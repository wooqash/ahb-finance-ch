import { ButtonData } from "types/buttons-data";
import { MouseEvent } from "react";

import style from "./links.module.scss";
import { HiArrowNarrowRight } from "react-icons/hi";

type ButtonProps = {
    button: ButtonData;
    appearance: string;
    type?: "button" | "submit" | "reset" | undefined;
    handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
 
const Button:React.FC<ButtonProps> = (props) => {
    const { button, appearance, type = "button", handleClick } = props;
    return (
        <button onClick={handleClick} className={`${style.button} ${style[`button--${appearance}`]}`} type={type}>
            <span className={style["button__content-wrapper"]}>
                <span className={style.button__caption}>{button.label}</span>
                <span className={style.button__icon}><HiArrowNarrowRight /></span>
            </span>
        </button>
    );
}
 
 
export default Button;