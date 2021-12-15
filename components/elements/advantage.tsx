import { AdvantageData } from "types/elements/advantage-data";
import CustomImage from "./custom-image";

type AdvantageProps = {
    advantage: AdvantageData;
}
 
const Advantage:React.FC<AdvantageProps> = (props) => {
    const { advantage } = props;
    const { title, description, icon } = advantage;

    return (
        <div>
            <h3>{title}</h3>
            {icon &&<CustomImage media={icon} />}
            <p>{description}</p>
        </div>
    );
}
 
 
export default Advantage;