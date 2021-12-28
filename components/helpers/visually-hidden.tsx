import { DEFAULT_LABELS } from "utils/default-labels";

type VisuallyHiddenProps = {
    label: string | undefined;
}
 
const VisuallyHidden:React.FC<VisuallyHiddenProps> = (props) => {
    return (
        <span className="sr-only">
            {props.label || DEFAULT_LABELS.ariaNewTabLabel}
        </span>
    );
}
 
 
export default VisuallyHidden;