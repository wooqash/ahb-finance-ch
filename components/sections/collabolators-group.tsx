import { CollabolatorsGroupData } from "types/sections-data";
import Collabolator from "../elements/collabolator";

type CollabolatorsGroupProps = {
    data: CollabolatorsGroupData,
}
 
const CollabolatorsGroup:React.FC<CollabolatorsGroupProps> = (props) => {
    const { data } = props;
    return (
        <section>
           <h2>{data.title}</h2>
           {data.collabolators.map((collabolator)=>{
               <Collabolator data={collabolator} key={collabolator.id} />
           })}
        </section>
    );
}
 
 
export default CollabolatorsGroup;