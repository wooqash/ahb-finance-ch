import { CollabolatorItemData } from "types/elements/collabolator-item-data";
import CustomLink from "../links/custom-link";
import CustomImage from "./custom-image";

type CollabolatorProps = {
    data: CollabolatorItemData;
}
 
const Collabolator:React.FC<CollabolatorProps> = (props) => {
    const { data } = props;
    const { collabDesc, collabName, collabCompanyName, collabImage, collabCompanyUrl, collabCompanyLogo } = data;

    return (
        <div>
            <div>
                {collabImage && <CustomImage media={collabImage} />}
            </div>
            <div>
                {collabDesc}
            </div>
            <div>
                <span>{collabName}</span>
                {collabCompanyName && <span>{collabCompanyName}</span>}
            </div>
            <div>
                {collabCompanyUrl && collabCompanyLogo && <CustomLink link={collabCompanyUrl}>
                    <CustomImage media={collabCompanyLogo} />
                </CustomLink>}
            </div>
        </div>
    );
}
 
 
export default Collabolator;