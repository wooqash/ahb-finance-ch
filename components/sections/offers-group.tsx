import { SectionsData } from "types/sections/sections-data";

type OffersGroupProps = {
    data: SectionsData;
}
 
const OffersGroup:React.FC<OffersGroupProps> = (props) => {
    const { data } = props;
    return (
        <div>
            OffersGroup
        </div>
    );
}
 
 
export default OffersGroup;