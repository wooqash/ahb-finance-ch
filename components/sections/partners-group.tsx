import { PartnersGroupData } from "types/sections-data";
import Partner from "../elements/partner";

type PartnersGroupProps = {
    data: PartnersGroupData,
}
 
const PartnersGroup:React.FC<PartnersGroupProps> = (props) => {
    const { data } = props;
    return (
        <section>
           <h2>{data.title}</h2>
           {data.partners.map((partner)=>{
               <Partner data={partner} key={partner.id} />
           })}
        </section>
    );
}
 
 
export default PartnersGroup;