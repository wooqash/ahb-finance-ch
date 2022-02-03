import CustomLink from "@/components/links/custom-link";
import { CreatorData } from "types/creator-data";
import style from "./creators.module.scss";

type CreatorsProps = {
  creators: CreatorData[];
};

const Creators: React.FC<CreatorsProps> = (props) => {
  const { creators } = props;

  return (
    <div className={style.wrapper}>
      {creators.map((creator: CreatorData) => {
        return <p key={creator.id} className={style.element}>{
            creator.label && <span>{creator.label}</span>
          }
          {
            creator.link && (
              <CustomLink id={`CreatorLink${creator.id}`} link={creator.link} className={style["element__link"]}>
                <span>{creator.link.label}</span>
              </CustomLink>
            )
          }</p>
      })}
    </div>
  );
};

export default Creators;
