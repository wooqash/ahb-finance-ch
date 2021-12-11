import { SectionsData } from "types/sections-data";

type PublicationsGroupProps = {
    data: SectionsData,
}
 
const PublicationsGroup:React.FC<PublicationsGroupProps> = (props) => {
    const { data } = props;
    return (
        <div>
            PublicationsGroup
        </div>
    );
}
 
export default PublicationsGroup;