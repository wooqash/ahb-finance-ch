import { MdLocationPin, MdPhone, MdEmail } from "react-icons/md";
import { ContactInfoData } from "types/contact-info-data";
import style from "./contact-info.module.scss";

type ContactInfoProps = {
  info: ContactInfoData;
};

const ContactInfo: React.FC<ContactInfoProps> = (props) => {
  const { info } = props;
  return (
    <address className={style["contact-info"]}>
      <p className={style["contact-info__title"]}>{info.companyName}</p>
      <p className={style["contact-info__address"]}>
        <span className={style["contact-info__icon"]}>
          <MdLocationPin />
        </span>
        {info.companyAddress}
      </p>
      <p className={style["contact-info__phoneno"]}>
        <span className={style["contact-info__icon"]}>
          <MdPhone />
        </span>
        <a href={`tel:${info.companyPhoneNo}`}>{info.companyPhoneNo}</a>
      </p>
      <p className={style["contact-info__email"]}>
        <span className={style["contact-info__icon"]}>
          <MdEmail />
        </span>
        <a href={`mailto:${info.companyEmailAddress}`}>{info.companyEmailAddress}</a>
      </p>
    </address>
  );
};

export default ContactInfo;
