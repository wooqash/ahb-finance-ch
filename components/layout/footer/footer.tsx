import ContactInfo from "@/components/layout/footer/contact-info/contact-info";
import CustomImage from "@/components/elements/custom-image";
import CustomLink from "@/components/links/custom-link";
import ReactMarkdown from "react-markdown";
import { FooterData } from "types/layout/footer-data";
import { ExtendedPageContextData } from "types/page-context-data";
import { SocialMediaLinksData } from "types/social-media-links-data";
import style from "./footer.module.scss";
import FooterNav from "./footer-nav/footer-nav";


type FooterProps = {
    footer: FooterData;
    socialMedia?: SocialMediaLinksData;
    pageContext: ExtendedPageContextData;
}
 
const Footer:React.FC<FooterProps> = (props) => {
    const { footer, socialMedia, pageContext } = props;
    const { columns, contactInfo, copyrightText, createdBy, legalLinks, logo} = footer;
    const startYear = new Date(new Date().setFullYear(2022));
    const presentYear =  new Date().getFullYear();
    const copyrightYear = presentYear > startYear.getFullYear() ? ` - ${presentYear}` : '';

    return (
        <footer className={style.footer}>
            <div className={style["footer__logo"]}>
                {logo && logo.link ? (
                    <CustomLink link={logo.link}>
                        <CustomImage media={logo.image} layout="fixed" cWidth={192} cHeight={91} />
                    </CustomLink>
                ) : logo ? (
                <CustomImage media={logo.image} />
                ) : (
                ""
                )}
            </div>
            <div className={style["footer__navbar"]}>
                {contactInfo && <ContactInfo info={contactInfo} />}
                {columns && <FooterNav columns={columns} />}
            </div>
            <div className={style["footer__links"]}>
                {socialMedia && <ul>
                    {socialMedia.links.map((smLink) => {
                        return <li key={smLink.id}>
                            <CustomLink link={smLink.link}>
                                <span>{smLink.type}</span>
                            </CustomLink>
                        </li> 
                    })}
                </ul>}
                {legalLinks && <ul>
                    {legalLinks.map((legalLink) => {
                        return <li key={legalLink.id}>
                            <CustomLink link={legalLink}>
                                <span>{legalLink.label}</span>
                            </CustomLink>
                        </li>
                    })}
                </ul>}
            </div>
            <div className={style["footer__infobar"]}>
                {copyrightText && <p>{`${copyrightText} ${copyrightYear}`}</p>}
                {createdBy && <div>
                    <ReactMarkdown>
                    {createdBy}
                </ReactMarkdown></div>}
            </div>
        </footer>
    );
}
 
export default Footer;