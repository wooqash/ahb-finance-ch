import CustomLink from "@/components/links/custom-link";
import { FooterColumnData } from "types/layout/footer-data";
import style from "./footer-nav.module.scss";

type FooterNavProps = {
  columns: FooterColumnData[];
};

const FooterNav: React.FC<FooterNavProps> = (props) => {
  const { columns } = props;
  return (
    <nav className={style.footerNav} role="navigation" aria-labelledby="FooterMenu">
      <ul className={style.footerNav__columns} id="FooterMenu" >
        {columns.map((column) => (
          <li key={`FooterMenuItem${column.id}`} className={style["footerNav__column-title"]}>
            {column.title ? (
              <>
                {column.title}
                <ul className={style["footerNav__menu"]} role="menubar">
                  {column.links.map((link) => (
                    <li key={`FooterMenuLink${link.id}`} role="menuitem" className={style["footerNav__menu-item"]}>
                      <CustomLink link={link} className={style["footerNav__menu-item-link"]}>
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
      </ul>
    </nav>
  );
};

export default FooterNav;
