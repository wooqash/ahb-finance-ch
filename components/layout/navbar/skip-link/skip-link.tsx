import style from "./skip-link.module.scss";

type SkipLinkProps = {
    label: string,
    sectionId: string
}
 
const SkipLink:React.FC<SkipLinkProps> = (props) => {
    const { label, sectionId } = props;
    return (
        <a className={`${style["skip-link"]} visible-hidden`} href={`#${sectionId}`}>
          {label}
        </a>
    );
}
 
export default SkipLink;