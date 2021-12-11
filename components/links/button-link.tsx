import Link from "next/link";
import { ButtonLinkData } from "types/buttons-data";
import CustomLink from "./custom-link";

type ButtonLinkProps = {
    button: ButtonLinkData;
    appearance: string;
}

const ButtonContent:React.FC<ButtonLinkProps> = (props) => {
    const {button, appearance} = props;
    return (
        <div>{button.label}</div>
    )
}
 
const ButtonLink:React.FC<ButtonLinkProps> = (props) => {
    const { button, appearance } = props;

    return (
        <CustomLink link={button} role="button">
            <ButtonContent
                button={button}
                appearance={appearance}
            />
        </CustomLink>
    );
}
 
 
export default ButtonLink;