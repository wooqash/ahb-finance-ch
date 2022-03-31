import { ServiceData } from "types/elements/service-data";
import CustomImage from "../custom-image";
import style from "./Service.module.scss";

type ServiceProps = {
    data: ServiceData;
}
 
const Service:React.FC<ServiceProps> = (props) => {
    const { data } = props;
    const { title, description, icon } = data;

    return (
        <li className={style.item}>
            {icon && <div className={style.item__icon}><CustomImage  media={icon} /></div>}
            <h4>{ title }</h4>
            <div>{ description }</div>
        </li>
    );
}
 
 
export default Service;