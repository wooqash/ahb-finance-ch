import { ReactNode } from "react";
import Link from "next/link"
import { LinkData } from "types/links/link-data";

type CustomLinkProps = {
  link: LinkData;
  children: ReactNode;
};

const CustomLink: React.FC<CustomLinkProps> = ({ link, children }) => {
  const isInternalLink = link.url.startsWith("/");

  console.log(isInternalLink);

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href="/[[...slug]]" as={link.url}>
        <a>{children}</a>
      </Link>
    );
  }

  // Plain <a> tags for external links
  if (link.newTab) {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a href={link.url} target="_self">
      {children}
    </a>
  );
};

export default CustomLink;
