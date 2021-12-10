import { AdvantagesGroupData } from "types/sections/advantages-group-data";

type AdvantagesGroupProps = {
    data: AdvantagesGroupData;
    // children: React.ReactChild;
}
 
const AdvantagesGroup:React.FC<AdvantagesGroupProps> = (props) => {
    const { data } = props;
    return (
        <div>
            AdvantagesGroup
        </div>
    );
}
 
 
export default AdvantagesGroup;