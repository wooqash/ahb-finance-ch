import Toggle from "react-toggle";
import { CookieGroupTypes } from "types/cookie-info-data";
import { ChangeEvent } from "react";

type CookieDetailsRowProps = {
  groupName: CookieGroupTypes;
  title: string;
  description: string;
  defaultChecked: boolean;
  cookieSum: number;
  cookieLblSingle: string;
  cookieLblPlural: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CookieDetailsRow: React.FC<CookieDetailsRowProps> = ({
  title,
  description,
  groupName,
  defaultChecked,
  cookieSum,
  cookieLblSingle,
  cookieLblPlural,
  onChange,
}) => {
  return (
    <div className="flex items-center border-b border-third-dark first:border-t last:border-b-0">
      <div className="w-3/12 p-4 break-words">
        {title}
        <br />
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
          {cookieSum}
        </span>
        <span className="inline-flex items-center justify-center text-xs">
          {cookieSum === 1 ? cookieLblSingle : cookieLblPlural}
        </span>
      </div>
      <div className="w-7/12 p-4 text-left">{description}</div>
      <div className="w-2/12 p-4 ">
        <Toggle
          disabled={groupName === CookieGroupTypes.necessary || !cookieSum ? true : false}
          defaultChecked={defaultChecked}
          aria-label={title}
          id={groupName}
          name={groupName}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CookieDetailsRow;
