import { AdvantageData } from "types/elements/advantage-data";
import NextImage from "./image";

type AdvantageProps = {
    advantage: AdvantageData;
}
 
const Advantage:React.FC<AdvantageProps> = (props) => {
    const { advantage } = props;
    const { title, description, icon } = advantage;

    return (
        <div>
            <h3>{title}</h3>
            {icon &&<NextImage media={icon} />}
            <p>{description}</p>
        </div>
    );
}
 
 
export default Advantage;