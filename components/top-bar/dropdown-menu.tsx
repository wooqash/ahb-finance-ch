import { LinkData } from "types/buttons-data";
import { ItemProps } from "types/use-dropdown-menu";
import CustomLink from "../links/custom-link";
import style from "./dropdown-menu.module.scss";

type DropdownMenuProps = {
  label?: string;
  items: Array<LinkData & ItemProps>;
  isOpen: boolean;
};

const DropdownMenu: React.FC<DropdownMenuProps> = (props, ref) => {
  const { label, items, isOpen } = props;
  const menuRoleAttr = { role: "menu" };

  return (
    <div className={`${style['dropdown-menu']} ${ isOpen ? style['dropdown-menu--visible'] : ''}`} {...menuRoleAttr} aria-label={label} >
      {items.map((link) => {
          const roleAttr = link.role === "menuitem" ? link.role : "menuitem";
          return <CustomLink
            {...link}
            id={link.id.toString()}
            key={link.id}
            link={link}
            className={style["dropdown-menu__link"]}
            role={roleAttr}
            ref={link.ref}
          >
            <span>{link.label}</span>
          </CustomLink>
        })}
    </div>
  );
};

export default DropdownMenu;
