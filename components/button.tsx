import { MouseEvent, ReactNode } from "react";
import styles from "./button.module.scss";

type ButtonProps = {
    ariaLabel?: string;
    children?: ReactNode;
    id?: string;
    label?: string;
    name?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'contained' | 'icon';
    className?: string;
    onClick?: (e: MouseEvent) => void;
}

const Button:React.FC<ButtonProps> = ({ariaLabel, children, id, label,  name, type, className, onClick}) => {
    return (
        <button type={ type } id={ id || name } name={name} aria-label={ariaLabel} className={className} onClick={onClick}>
            {children || null}
            {label || null}
        </button>
    );
}
 
export default Button;