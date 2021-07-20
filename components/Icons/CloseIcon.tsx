import React from "react";

type CloseIconProps = {
    className?: string,
    width?: string,
    height?: string,
}
 
const CloseIcon:React.FC<CloseIconProps> = ({ className = 'svg-icon', width = '18', height = '18'}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18">
            <g>
                <path className={className} d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </g>
        </svg>
    );
}
 
export default CloseIcon;