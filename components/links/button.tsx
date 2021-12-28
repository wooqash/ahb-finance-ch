import { ButtonData } from "types/buttons-data";
import { MouseEvent } from "react";

type ButtonProps = {
    button: ButtonData;
    appearance: string;
    handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
 
const Button:React.FC<ButtonProps> = (props) => {
    const { button, appearance, handleClick } = props;
    return (
        <button onClick={handleClick}>
            {button.label}
        </button>
    );
}
 
 
export default Button;