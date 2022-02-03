import CustomLink from "@/components/links/custom-link";
import { LinkData } from "types/buttons-data";
import style from "./legal-links.module.scss";

type LegalLinksProps = {
    links: LinkData[]
}
 
const LegalLinks:React.FC<LegalLinksProps> = (props) => {
    const { links } = props;

    return (
        <ul className={style.list}>
            {links.map((link) => {
                return <li key={link.id} className={style.list__item}>
                    <CustomLink id={`LegalLink${link.id}`} link={link}>
                        <span>{link.label}</span>
                    </CustomLink>
                </li>
            })}
        </ul>
    );
}
 
export default LegalLinks;