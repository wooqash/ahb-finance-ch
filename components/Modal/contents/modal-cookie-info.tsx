import { useState, ChangeEvent } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactMarkdown from "react-markdown";
import "react-toggle/style.css";

import CookieDetailsRow from "@/components/Cookies/cookie-details-row";
import rmStyles from "@/components/markdown-styles.module.scss";
import { CookieInfoData } from "types/cookie-info-data";
import { CookieGroupsFlags, CookieTypeSum } from "types/cookies";

type ModalCookieInfoProps = {
  content: Pick<CookieInfoData, "tabs" | "groups" | "cookieLblSingle" | "cookieLblPlural">;
  consents: CookieGroupsFlags;
  cookieTypesSum: CookieTypeSum;
  onHandleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ModalCookieInfo: React.FC<ModalCookieInfoProps> = ({ content, consents, cookieTypesSum, onHandleChange }) => {
  const { tabs, groups, cookieLblSingle, cookieLblPlural } = content;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabChange = (newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <>
      <Tabs
        selectedIndex={selectedTabIndex}
        onSelect={handleTabChange}
        className="border border-third-dark"
      >
        <TabList className={`flex justify-between`}>
          {tabs.map((tab, idx) => {
            // console.log(tab.id);
            return (
              <Tab
                key={`${tab.id}tab`}
                className={`w-${Math.floor(
                  12 / tabs.length
                )}/12 p-4 border-b cursor-pointer border-third-dark focus:outline-third-color ${
                  idx === selectedTabIndex
                    ? "bg-third text-on-third-dark-text-color"
                    : ""
                }`}
              >
                {tab.label}
              </Tab>
            );
          })}
        </TabList>
        {tabs.map((tab, idx) => {
          if (idx === 0) {
            return (
              <TabPanel key={`${tab.id}${idx.toString()}tabpanel`}>
                <ReactMarkdown className={`px-8 py-4 text-left ${rmStyles.markdown}`}>
                  {tab.description}
                </ReactMarkdown>
                <div>
                  {groups.map((group) => {
                    const cookieSum = cookieTypesSum[group.groupName];
                    return <CookieDetailsRow key={group.groupName} title={group.title} description={group.description} cookieSum={cookieSum} cookieLblSingle={cookieLblSingle} cookieLblPlural={cookieLblPlural}  groupName={group.groupName} defaultChecked={consents[group.groupName]} onChange={onHandleChange} />;
                  })}
                </div>
              </TabPanel>
            );
          } else {
            return (
              <TabPanel key={`${tab.id}${idx.toString()}tabpanel`}>
                <ReactMarkdown className={`px-8 p-4 text-left ${rmStyles.markdown}`}>
                  {tab.description}
                </ReactMarkdown>
              </TabPanel>
            );
          }
        })}
      </Tabs>
    </>
  );
};

export default ModalCookieInfo;
