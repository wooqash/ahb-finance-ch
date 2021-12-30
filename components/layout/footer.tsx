import ReactMarkdown from "react-markdown";
import { FooterData } from "types/layout/footer-data";
import { ExtendedPageContextData } from "types/page-context-data";
import { SocialMediaLinksData } from "types/social-media-links-data";
import CustomImage from "../elements/custom-image";
import CustomLink from "../links/custom-link";


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
        <footer>
            <div>
                {logo?.image && logo.link && <CustomLink link={logo.link}><CustomImage media={logo.image} /></CustomLink>}
            </div>
            <div>
                <h4>{contactInfo?.companyName}</h4>
                <p>{contactInfo?.companyAddress}</p>
                <p>{contactInfo?.companyPhoneNo}</p>
                <p>{contactInfo?.companyEmailAddress}</p>
            </div>
            <div>
                {columns && <ul>
                    {columns.map((column) => (
                        <li key={column.id}>
                        {column.title ? (
                            <>
                            {column.title}
                            <ul>
                                {column.links.map((link) => (
                                <li key={link.id}>
                                    <CustomLink link={link}>
                                    <span>{link.label}</span>
                                    </CustomLink>
                                </li>
                                ))}
                            </ul>
                            </>
                        ) : (
                            <CustomLink link={column.links[0]}>
                                <span>{column.links[0].label}</span>
                            </CustomLink>
                        )}
                        </li>
                    ))}
                </ul>}
            </div>
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
            {copyrightText && <p>{`${copyrightText} ${copyrightYear}`}</p>}
            {createdBy && <div>
                <ReactMarkdown>
                {createdBy}
              </ReactMarkdown></div>}
        </footer>
    );
}
 
export default Footer;