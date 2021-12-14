import { OffersGroupData } from "types/sections-data";
import Offer from "../elements/offer";

type OffersGroupProps = {
    data: OffersGroupData;
}
 
const OffersGroup:React.FC<OffersGroupProps> = (props) => {
    const { data } = props;
    return (
        <section>
            <h2>{data.title}</h2>
            {data.offerGroups.map((offer)=> {
                return (
                    <Offer data={offer} key={offer.id} />
                )
            })}
        </section>
    );
}
 
 
export default OffersGroup;