import Image from "next/image";
import { PartnersGroupData } from "types/sections-data";
import PartnersSlider from "../elements/partners-slider";
import TopTriangle from "public/images/off-top-triangle.svg";

import style from "./partners-group.module.scss";

type PartnersGroupProps = {
  data: PartnersGroupData;
};

const PartnersGroup: React.FC<PartnersGroupProps> = (props) => {
  const { data } = props;
  return (
    <section className={`partners-group ${style.section}`}>
      <div className={style.section__wrapper}>
        <h2 className={style.section__title}>{data.title}</h2>
        <PartnersSlider data={data} />
        <div className={style["section__top-triangle"]}>
          <Image src={TopTriangle} alt="" />
        </div>
      </div>
    </section>
  );
};

export default PartnersGroup;
