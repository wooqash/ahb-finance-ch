import { OfferData } from "types/elements/offer-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";

type OfferProps = {
  data: OfferData;
};

const Offer: React.FC<OfferProps> = (props) => {
  const { data } = props;
  const { groupName, offer, moreBtn } = data;

  return (
    <div>
      <h3>{groupName}</h3>
      {offer ? (
        <ul>
          {offer.map((item) => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>
      ) : (
        ""
      )}

      <ButtonLink
        button={moreBtn}
        appearance={getButtonAppearance(moreBtn.type, "light")}
      />
    </div>
  );
};

export default Offer;
