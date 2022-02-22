import Link from "next/link";
import { ArticleData } from "types/blog-data";
import { ButtonType } from "types/buttons-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";
import CustomImage from "./custom-image";

import style from "./card.module.scss";
import CustomLink from "../links/custom-link";

type CardProps = {
  article: ArticleData;
};

const Card: React.FC<CardProps> = (props) => {
  const { article } = props;
  const { image, title } = article;
  const link = {
    id: article.id,
    label: "",
    url: `/article/${article.slug}`,
    newTab: false,
  };

  return (
    <div className={style.item}>
      <CustomLink
        id={`ArticleLink${article.id}`}
        link={link}
        className={style.item__link}
      >
        <div>
          <div className={style.item__image}>
            <CustomImage media={image} layout="fill" />
          </div>
          <h3 className={style.item__title}>{title}</h3>
        </div>
      </CustomLink>
    </div>
  );
};

export default Card;
