import { SectionsData } from "types/sections/sections-data";

type PartnersProps = {
    data: SectionsData,
}
 
const Partners:React.FC<PartnersProps> = (props) => {
    const { data } = props;
    return (
        <div>
            Partners
        </div>
    );
}
 
 
export default Partners;