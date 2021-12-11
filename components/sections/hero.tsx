import { HeroData } from "types/sections-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";


type HeroProps = {
    data: HeroData;
}
 
const Hero:React.FC<HeroProps> = (props) => {
    const { data } = props;
    return (
        <section>
            <h1>{data.title}</h1>
            {data.cta?.map((button) => {
                return <ButtonLink
                    button={button}
                    appearance={getButtonAppearance(button.type, "light")}
                    key={button.id}
                />
            })}
        </section>
    );
}
 
export default Hero;