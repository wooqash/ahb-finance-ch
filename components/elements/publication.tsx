import { PublicationItemData } from "types/elements/publication-item-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";
import CustomLink from "../links/custom-link";
import CustomImage from "./custom-image";

type PublicationProps = {
  data: PublicationItemData;
};

const Publication: React.FC<PublicationProps> = (props) => {
  const { data } = props;
  const { title, description, links, image } = data;
  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      {image && <CustomImage media={image} />}
      <div>
        {links.map((link) => {
          return (
            <ButtonLink
              button={link}
              appearance={getButtonAppearance(link.type, "light")}
              key={link.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Publication;
