import { MenuItemData } from "types/elements/menu-item-data";
import style from "./main-menu.module.scss";
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { LinkData } from "types/buttons-data";
import DropdownButton from "../dropdown-button/dropdown-button";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import CustomLink from "@/components/links/custom-link";

type MainMenuProps = {
  menuId: string;
  menuItems: MenuItemData[];
};

const MainMenu: React.FC<MainMenuProps> = (props) => {
  const { menuId, menuItems } = props;
  const menubarRole = { role: "menubar" };
  
  if (!menuItems) {
    throw new Error(`${menuId} has no element children.`)
  }

  return (
    <ul
      id={menuId}
      className={style.mainmenu}
      {...menubarRole}
      aria-label="Main menu"
    >
      {menuItems.map((menuItem) => {
        const numberOfItems = menuItem.navLevelLabel && menuItem.link.length || 0;
        const { buttonProps, itemProps, isOpen } = useDropdownMenu(numberOfItems);
        const dropdownItems = menuItem.link.map((link: LinkData, index: number) => {
          return {...link, ...itemProps[index]}
        })

        return <li key={menuItem.id} role="none" className={`${style.mainmenu__item} ${ menuItem.navLevelLabel ? style['mainmenu__item--dropdown'] : ''}`}>
          {menuItem.navLevelLabel ? (
            <>
              <DropdownButton buttonProps={buttonProps} isOpen={isOpen} label={menuItem.navLevelLabel} />
              <DropdownMenu label={menuItem.navLevelLabel} items={dropdownItems} isOpen={isOpen} />
            </>
          ) : (
            <CustomLink link={menuItem.link[0]} className={`${style.mainmenu__link}`}>
              <span>{menuItem.link[0].label}</span>
            </CustomLink>
          )}
        </li>
      })}
    </ul>
  );
};

export default MainMenu;
