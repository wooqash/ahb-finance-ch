import React from "react";
import ReactMarkdown from "react-markdown";
import { LinkButtonData } from "types/link-button-data";
import styles from './button.module.scss';

type LocalizationPageContentProps = {
    text: string,
    buttons: LinkButtonData[]
}
 
const LocalizationPageContent:React.FC<LocalizationPageContentProps> = ({text, buttons}) => {
    // console.log(text);
    
    return (
        <>
            <div className="mx-auto my-10 lg:max-w-3xl">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center">
                {buttons.map((button, index) => {
                    const target = button.openInNewTab ? "_blank" : "_self";
                    const rel = button.openInNewTab ? "noreferrer noopener" : '';
                    return (
                        <React.Fragment key={button.label}>
                            <a href={button.url} target={target} rel={rel} className={`${styles.button} ${styles['button--contained']} w-11/12 max-w-sm sm:w-7/12`}>{button.label}</a>
                            {index < buttons.length -1 && <span className={styles.divider}></span> }
                        </React.Fragment>
                    )
                })}
            </div>
        </>
    );
}
 
 
export default LocalizationPageContent;