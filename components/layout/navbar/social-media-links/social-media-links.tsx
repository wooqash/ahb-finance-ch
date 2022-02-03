import { SocialLinkData } from "types/buttons-data";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import style from "./social-media-links.module.scss";
import CustomLink from "@/components/links/custom-link";

type SocialMediaLinksProps = {
  links: SocialLinkData[];
  customClasses?: string;
};

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = (props) => {
  const { links, customClasses } = props;

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
    <ul className={`${style["sm-list"]} ${customClasses || ''} `}>
      {links.map((link: SocialLinkData) => {
        return <li key={link.id} className={style["sm-list__item"]}>
          <CustomLink id={`SocialMedia${link.id}`} link={link.link}>{getSocialIcon(link.type)}</CustomLink>
        </li>
      })}
    </ul>
  );
};

export default SocialMediaLinks;
