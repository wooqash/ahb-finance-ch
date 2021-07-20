import Image from 'next/image';
import Button from './button';
import FacebookIcon from './Icons/FacebookIcon';
import InstagramIcon from './Icons/InstagramIcon';
import LinkedinIcon from './Icons/LinkedinIcon';
import styles from './button.module.scss';

type ShareButtonsProps = {}
 
const ShareButtons:React.FC<ShareButtonsProps> = () => {
    return (
        <div className={styles['share-buttons']}>
            <Button type="button">
                <FacebookIcon className={styles['svg-icon']} />
            </Button>
            <Button type="button">
                <InstagramIcon className={styles['svg-icon']} />
            </Button>
            <Button type="button">
                <LinkedinIcon className={styles['svg-icon']} />
            </Button>
        </div>
    );
}
 
 
export default ShareButtons;