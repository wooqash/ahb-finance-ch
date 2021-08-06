import { useState, ChangeEvent, MouseEvent } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactMarkdown from "react-markdown";
import "react-toggle/style.css";
import Button from '@/components/button';
import CookieDetailsRow from "@/components/Cookies/cookie-details-row";
import rmStyles from "@/components/markdown-styles.module.scss";
import { CookieInfoData } from "types/cookie-info-data";

type CookieInfoBoxProps = {
  content: Pick<CookieInfoData, "tabs" | "groups" | "acceptAllCookiesButtonLabel" | "acceptSelectedCookiesButtonLabel" | "acceptNecessaryCookiesButtonLabel">;
  consents: {
    necessary: boolean;
    preferences: boolean;
    stats: boolean;
    marketing: boolean;
    social: boolean;
    unclassified: boolean;
  };
  onAcceptAllCookies?: (e: MouseEvent<HTMLElement>) => void;
  onAcceptSelectedCookies?: (e: MouseEvent<HTMLElement>) => void;
  onAcceptNecessaryCookies?: (e: MouseEvent<HTMLElement>) => void;
  onHandleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CookieInfoBox: React.FC<CookieInfoBoxProps> = ({ content, consents, onAcceptAllCookies, onAcceptSelectedCookies, onAcceptNecessaryCookies, onHandleChange }) => {
  const { tabs, groups, acceptAllCookiesButtonLabel, acceptSelectedCookiesButtonLabel, acceptNecessaryCookiesButtonLabel } = content;
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
                <ReactMarkdown className={`p-4 text-left ${rmStyles.markdown}`}>
                  {tab.description}
                </ReactMarkdown>
                <div>
                  {groups.map((group) => {
                    return <CookieDetailsRow key={group.groupName} title={group.title} description={group.description} groupName={group.groupName} defaultChecked={consents[group.groupName]} onChange={onHandleChange} />;
                  })}
                </div>
              </TabPanel>
            );
          } else {
            return (
              <TabPanel key={`${tab.id}${idx.toString()}tabpanel`}>
                <ReactMarkdown className={`p-4 text-left ${rmStyles.markdown}`}>
                  {tab.description}
                </ReactMarkdown>
              </TabPanel>
            );
          }
        })}
      </Tabs>
      <Button id="AcceptAllCookies" onClick={onAcceptAllCookies}>{acceptAllCookiesButtonLabel}</Button>
      <Button id="AcceptSelectedCookies" onClick={onAcceptSelectedCookies}>{acceptSelectedCookiesButtonLabel}</Button>
      <Button id="AcceptNecessaryCookies" onClick={onAcceptNecessaryCookies}>{acceptNecessaryCookiesButtonLabel}</Button>
    </>
  );
};

export default CookieInfoBox;
