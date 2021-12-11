import Link from "next/link";
import { ButtonLinkData, LinkData } from "types/buttons-data";

type CustomLinkProps = {
  link: LinkData | ButtonLinkData;
  children: React.ReactChild;
  role?: "button";
};

const CustomLink: React.FC<CustomLinkProps> = (props) => {
  const { link, children, role } = props;
  const isInternalLink = link.url.startsWith("/");
  const roleAttribute = role ? { role: role } : {};

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href="/[[...slug]]" as={link.url}>
        <a {...roleAttribute} className="inline-block">{children}</a>
      </Link>
    );
  }

  // Plain <a> tags for external links
  if (link.newTab) {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" {...roleAttribute} className="inline-block">
        {children}
        {link.ariaNewTabLabel && <span className="sr-only">({link.ariaNewTabLabel})</span>}
      </a>
    );
  }

  return (
    <a href={link.url} target="_self" {...roleAttribute} className="inline-block">
      {children}
    </a>
  );
};

export default CustomLink;
