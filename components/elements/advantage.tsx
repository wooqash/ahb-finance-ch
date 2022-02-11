import { AdvantageData } from "types/elements/advantage-data";
import CustomImage from "./custom-image";

import style from "./advantage.module.scss";

type AdvantageProps = {
    advantage: AdvantageData;
}
 
const Advantage:React.FC<AdvantageProps> = (props) => {
    const { advantage } = props;
    const { title, description, icon } = advantage;

    return (
        <div className={style.column}>
            {icon && <div className={style.column__icon}><CustomImage media={icon} /></div>}
            <h3 className={style.column__title}>{title}</h3>
            <p className={style.column__text}>{description}</p>
        </div>
    );
}
 
 
export default Advantage;