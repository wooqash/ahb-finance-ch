import { SectionsData } from "types/sections-data";

type FaqGroupProps = {
    data: SectionsData;
}
 
const FaqGroup:React.FC<FaqGroupProps> = (props) => {
    const { data } = props;
    return (
        <div>
            FaqGroup
        </div>
    );
}
 
 
export default FaqGroup;