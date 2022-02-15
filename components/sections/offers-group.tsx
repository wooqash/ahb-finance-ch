import Image from "next/image";
import { OffersGroupData } from "types/sections-data";
import Offer from "../elements/offer";

import Pig from "public/images/blue-pig.svg";
import TopTriangle from "public/images/off-top-triangle.svg";
import BottomTriangle from "public/images/off-bottom-triangle.svg";

import style from "./offers-group.module.scss";

type OffersGroupProps = {
  data: OffersGroupData;
};

const OffersGroup: React.FC<OffersGroupProps> = (props) => {
  const { data } = props;
  return (
    <section className={style.section}>
      <div className={style.section__wrapper}>
        <div className={style.section__headline}>
          <h2 className={style.section__title}>{data.title}</h2>
          <div className={style.section__watermark}>
            <Image src={Pig} alt={`semi-transparent blue pig watermark`} />
          </div>
        </div>
        {data.offerGroups && (
          <div className={style["section__offers-wrapper"]}>
            {data.offerGroups.map((offer) => {
              return <Offer data={offer} key={offer.id} />;
            })}
          </div>
        )}
      </div>
      <div className={style["section__top-triangle"]}>
        <Image src={TopTriangle} alt="" />
      </div>
      <div className={style["section__bottom-triangle"]}>
        <Image src={BottomTriangle} alt="" />
      </div>
    </section>
  );
};

export default OffersGroup;
