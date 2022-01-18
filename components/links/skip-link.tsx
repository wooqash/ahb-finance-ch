type SkipLinkProps = {
    label: string,
    sectionId: string
}
 
const SkipLink:React.FC<SkipLinkProps> = (props) => {
    const { label, sectionId } = props;
    return (
        <a className="skip-link visible-hidden" href={`#${sectionId}`}>
          {label}
        </a>
    );
}
 
export default SkipLink;