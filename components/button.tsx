import { FormikErrors } from "formik";
import { MouseEvent, ReactNode } from "react";
import styles from "./button.module.scss";

type ButtonProps = {
    ariaLabel?: string;
    children?: ReactNode;
    id?: string;
    name?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'contained' | 'outlined' | 'text' | 'icon';
    className?: string;
    onClick?: (e: MouseEvent) => void;
    disabled?: true | FormikErrors<any>;
    ariaDisabled?: boolean | "true" | "false";
}

const Button:React.FC<ButtonProps> = ({ariaLabel, ariaDisabled, children, id,  name, type, variant = 'contained', className, onClick}) => {
    return (
        <button type={ type } id={ id || name } name={name} aria-label={ariaLabel} aria-disabled={ariaDisabled} className={`${className} ${styles.button} ${styles[`button--${variant}`]}`} onClick={onClick}>
            {children || null}
        </button>
    );
}
 
export default Button;