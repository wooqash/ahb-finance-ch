import { ReactNode } from 'react';

import style from "./main.module.scss";

type MainProps = {
    children: ReactNode;
}
 
const Main:React.FC<MainProps> = (props) => {
    const { children } = props;
    return (
        <main id="Main" className={`${style["main-content"]}`}>{children}</main>
    );
}
 
 
export default Main;