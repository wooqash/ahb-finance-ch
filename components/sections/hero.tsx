import { HeroData } from "types/sections/hero-data";

type HeroProps = {
    data: HeroData;
}
 
const Hero:React.FC<HeroProps> = (props) => {
    const { data } = props;
    return (
        <div>
            {data.title}
        </div>
    );
}
 
 
export default Hero;