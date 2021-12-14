import { AdvantagesGroupData } from "types/sections-data";
import Advantage from "../elements/advantage";


type AdvantagesGroupProps = {
    data: AdvantagesGroupData;
    // children: React.ReactChild;
}
 
const AdvantagesGroup:React.FC<AdvantagesGroupProps> = (props) => {
    const { data } = props;
    return (
        <section>
            <h2>{data.title}</h2>
            {data.advantages.map((advantage)=> {
                return <Advantage advantage={advantage} key={advantage.id} />
            })}
        </section>
    );
}
 
 
export default AdvantagesGroup;