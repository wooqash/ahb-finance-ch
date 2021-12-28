import { PublicationsGroupData } from "types/sections-data";
import Publication from "../elements/publication";

type PublicationsGroupProps = {
    data: PublicationsGroupData,
}
 
const PublicationsGroup:React.FC<PublicationsGroupProps> = (props) => {
    const { data } = props;
    return (
        <section>
           <h2>{data.title}</h2>
           {data.publications.map((publication)=>{
               return <Publication data={publication} key={publication.id} />
           })}
        </section>
    );
}
 
export default PublicationsGroup;