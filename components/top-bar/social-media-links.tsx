import { SocialLinkData } from "types/buttons-data";
import CustomLink from "../links/custom-link";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import style from "./social-media-links.module.scss";

type SocialMediaLinksProps = {
  links: SocialLinkData[];
};

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = (props) => {
  const { links } = props;

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "facebook":
        return <BsFacebook />;
      case "instagram":
        return <BsInstagram />;
      case "linkedin":
        return <BsLinkedin />;
      case "youtube":
        return <BsYoutube />;
    }
  };

  return (
    <ul className={style["social-media-links"]}>
      {links.map((link: SocialLinkData) => {
        return <li key={link.id} className={style["social-media-links__item"]}>
          <CustomLink link={link.link}>{getSocialIcon(link.type)}</CustomLink>
        </li>
      })}
    </ul>
  );
};

export default SocialMediaLinks;
