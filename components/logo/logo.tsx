import { LogoLinkData } from "types/buttons-data";
import { domainToASCII } from "url";
import CustomImage from "../elements/custom-image";
import CustomLink from "../links/custom-link";

type LogoProps = {
    data: LogoLinkData;
    layout?: "intrinsic" | "fixed" | "fill" | "responsive";
    width?: number;
    height?: number;
}
 
const Logo:React.FC<LogoProps> = (props) => {
    const { data, layout = "intrinsic", width, height } = props;
    const cWidth = width || "";
    const cHeight = height || "";
    return (
        <>
        {data.link ? (
            <CustomLink link={data.link}>
              <CustomImage media={data.image} layout={layout} {...cWidth} {...cHeight} />
            </CustomLink>
        ) : 
        (
            <CustomImage media={data.image} />
        )}
        </>
    );
}
 
 
export default Logo;