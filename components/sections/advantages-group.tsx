import Image from "next/image";

import { AdvantagesGroupData } from "types/sections-data";
import Advantage from "../elements/advantage";

import style from "./advantages-group.module.scss";
import TopTriangle from "public/images/adv-top-triangle.svg";
import BottomTriangle from "public/images/adv-bottom-triangle.svg";

type AdvantagesGroupProps = {
  data: AdvantagesGroupData;
  // children: React.ReactChild;
};

const AdvantagesGroup: React.FC<AdvantagesGroupProps> = (props) => {
  const { data } = props;
  return (
    <section className={style.section}>
      <div className={style.section__wrapper}>
        <h2 className={style.section__title}>{data.title}</h2>
        <div className={style.section__columns}>
          {data.advantages.map((advantage) => (
            <Advantage advantage={advantage} key={advantage.id} />
          ))}
        </div>
        <div className={style["section__top-triangle"]}>
          <Image src={TopTriangle} alt="" />
        </div>
        <div className={style["section__bottom-triangle"]}>
          <Image src={BottomTriangle} alt="" />
        </div>
      </div>
    </section>
  );
};

export default AdvantagesGroup;
