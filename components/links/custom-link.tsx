import Link from "next/link";
import React from "react";
import { ButtonLinkData, LinkData } from "types/buttons-data";
import VisuallyHidden from "../helpers/visually-hidden";

import style from "./links.module.scss";

type CustomLinkProps = {
  id?: string;
  link: LinkData | ButtonLinkData;
  className?: string;
  children?: React.ReactChild;
  role?: "menuitem";
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>((props, ref) => {
  const {
    id,
    link,
    children,
    className,
    role,
    tabIndex,
    onKeyDown,
  } = props;
  const isInternalLink = link.url.startsWith("/");
  const classes = className ? { className } : {};
  const target = link.newTab ? {target: "_blank"} : {target : "_self"};
  const rel = !isInternalLink && link.newTab ? {rel: "noopener noreferrer"} : {};
  const roleAttr = role ? { role } : {}

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    const idAttr = id ? { id: `InternalMenuLink${id}`} : {};
    return (
      <Link href="/[[...slug]]" as={link.url}>
        <a
          {...idAttr}
          { ...classes }
          { ...roleAttr }
          tabIndex={tabIndex}
          ref={ref}
          onKeyDown={onKeyDown}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <a

      id={`MenuLink${id}`}
      href={link.url}
      { ...target }
      { ...rel }
      { ...classes }
      { ...roleAttr }
      tabIndex={tabIndex}
      ref={ref}
      onKeyDown={onKeyDown}
    >
      {children}
      {link.newTab && <VisuallyHidden label={link.ariaNewTabLabel} />}
    </a>
  );
});

export default CustomLink;

CustomLink.displayName = "CustomLink";
