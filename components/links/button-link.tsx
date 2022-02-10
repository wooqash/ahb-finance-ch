import { ButtonLinkData } from "types/buttons-data";
import CustomLink from "./custom-link";

import { HiArrowNarrowRight } from "react-icons/hi";

import style from  "./links.module.scss";

type ButtonLinkProps = {
    button: ButtonLinkData;
    appearance: string;
}

const ButtonLink:React.FC<ButtonLinkProps> = (props) => {
    const { button, appearance } = props;


    return (
        <CustomLink link={button} role="button" className={`${style.button} ${style[`button--${appearance}`]}`} >
            <span className={style["button__content-wrapper"]}>
                <span className={style.button__caption}>{button.label}</span>
                <span className={style.button__icon}><HiArrowNarrowRight /></span>
            </span>
        </CustomLink>
    );
}
 
 
export default ButtonLink;