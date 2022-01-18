import { MenuItemData } from "types/elements/menu-item-data";
import CustomLink from "../links/custom-link";
import style from "./main-menu.module.scss";
import DropdownMenu from "./dropdown-menu";
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import DropdownButton from "./dropdown-button";
import { LinkData } from "types/buttons-data";
import { PageAppearance } from "types/page-appearance.enum";

type MainMenuProps = {
  menuId: string;
  menuItems: MenuItemData[];
  appearance: PageAppearance;
};

const MainMenu: React.FC<MainMenuProps> = (props) => {
  const { menuId, menuItems, appearance } = props;
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
              <DropdownButton buttonProps={buttonProps} isOpen={isOpen} label={menuItem.navLevelLabel} appearance={appearance} />
              <DropdownMenu label={menuItem.navLevelLabel} items={dropdownItems} isOpen={isOpen} />
            </>
          ) : (
            <CustomLink link={menuItem.link[0]} className={`${style.mainmenu__link} ${appearance === PageAppearance.light ? style["mainmenu__link--light"] : style["menubar__link--dark"]}`}>
              <span>{menuItem.link[0].label}</span>
            </CustomLink>
          )}
        </li>
      })}
    </ul>
  );
};

export default MainMenu;
