import Link from "next/link";
import { ArticleData } from "types/blog-data";
import { ButtonType } from "types/buttons-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";
import CustomImage from "./custom-image";

type CardProps = {
  article: ArticleData;
};

const Card: React.FC<CardProps> = (props) => {
  const { article } = props;
  const { image, title, description } = article;
  const button = {
    id: article.id,
    label: "read",
    type: ButtonType.secondary,
    url: `/article/${article.slug}`,
  };

  return (
    <div>
      <div>
        <CustomImage media={image} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <ButtonLink
          button={button}
          appearance={getButtonAppearance(button.type, "light")}
        />
      </div>
    </div>
  );
};

export default Card;
