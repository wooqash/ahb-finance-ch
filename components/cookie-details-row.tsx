import Toggle from "react-toggle";
import { useState } from "react";
import { CookieGroupTypes } from "types/cookie-info-data";
import { ChangeEvent } from 'react';

type CookieDetailsRowProps = {
  groupName: CookieGroupTypes;
  title: string;
  description: string;
  defaultChecked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CookieDetailsRow: React.FC<CookieDetailsRowProps> = ({
  title,
  description,
  groupName,
  defaultChecked,
  onChange
}) => {
  return (
    <div className="flex items-center border-b border-third-dark first:border-t last:border-b-0">
      <div className="w-2/12 p-4">{title}</div>
      <div className="w-8/12 p-4 text-left">{description}</div>
      <div className="w-2/12 p-4 ">
        <Toggle
          disabled={groupName === CookieGroupTypes.necessary ? true : false}
          defaultChecked={defaultChecked}
          aria-label="No label tag"
          id={groupName}
          name={groupName}
        //   checked={consents[groupName]}
        //   value={consents[groupName]?"true":"false"}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CookieDetailsRow;
