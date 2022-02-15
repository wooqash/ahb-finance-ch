import { OfferData } from "types/elements/offer-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";

import style from "./offer.module.scss";

type OfferProps = {
  data: OfferData;
};

const Offer: React.FC<OfferProps> = (props) => {
  const { data } = props;
  const { groupName, offer, moreBtn } = data;

  return (
    <div className={style.group}>
      <h3 className={style["group__title"]}>{groupName}</h3>
      {offer ? (
        <ul className={style["group__list"]}>
          {offer.map((item) => {
            return (
              <li key={item.id} className={style["group__list-item"]}>
                {item.title}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
      <div className={style["group__button-wrapper"]}>
        <ButtonLink
          button={moreBtn}
          appearance={getButtonAppearance(moreBtn.type, "light")}
        />
      </div>
    </div>
  );
};

export default Offer;
