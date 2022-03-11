import ContactInfo from "@/components/layout/footer/contact-info/contact-info";
import { FooterData } from "types/layout/footer-data";
import { ExtendedPageContextData } from "types/page-context-data";
import { SocialMediaLinksData } from "types/social-media-links-data";
import style from "./footer.module.scss";
import FooterNav from "./footer-nav/footer-nav";
import SocialMediaLinks from "./social-media-links/social-media-links";
import LegalLinks from "./legal-links/legal-links";
import Creators from "./creators/creators";
import Logo from "@/components/logo/logo";

type FooterProps = {
  footer: FooterData;
  socialMedia?: SocialMediaLinksData;
  pageContext: ExtendedPageContextData;
};

const Footer: React.FC<FooterProps> = (props) => {
  const { footer, socialMedia, pageContext } = props;
  const { columns, contactInfo, copyrightText, creators, legalLinks, logo } =
    footer;
  const startYear = new Date(new Date().setFullYear(2022));
  const presentYear = new Date().getFullYear();
  const copyrightYear =
    presentYear > startYear.getFullYear() ? ` - ${presentYear}` : "";

  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        {logo && (
          <div className={style.footer__logo}>
            <Logo data={logo} />
          </div>
        )}
        <div className={style["footer__navbar"]}>
          {contactInfo && <ContactInfo info={contactInfo} />}
          {columns && <FooterNav columns={columns} />}
        </div>
        <div className={style["footer__links"]}>
          {socialMedia && (
            <SocialMediaLinks
              customClasses={style["sm-list"]}
              links={socialMedia.links}
            />
          )}
          {legalLinks && <LegalLinks links={legalLinks} />}
        </div>
        <div className={style["footer__infobar"]}>
          {copyrightText && (
            <p
              className={style["footer__copyrights"]}
            >{`${copyrightText} ${copyrightYear}`}</p>
          )}
          {creators && <Creators creators={creators} />}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
