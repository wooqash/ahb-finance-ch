import { PublicationsGroupData } from "types/sections-data";
import PublicationSlider from "../elements/publication-slider";

import style from "./publications-group.module.scss";

type PublicationsGroupProps = {
  data: PublicationsGroupData;
};

const PublicationsGroup: React.FC<PublicationsGroupProps> = (props) => {
  const { data } = props;
  return (
    <section className={`publication-group ${style.section}`}>
      <div className={style.section__wrapper}>
        <h2 className={style.section__title}>{data.title}</h2>
        <PublicationSlider data={data} />
        <div className={style["section__image-pad"]}></div>
      </div>
    </section>
  );
};

export default PublicationsGroup;
