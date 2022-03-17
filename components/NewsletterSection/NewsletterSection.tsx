import AriaModal from "react-aria-modal";
import { NewsletterForm } from "types/sections-data";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NewsletterModal from "../NewsletterModal/NewsletterModal";
import { FormsData } from "types/forms-data";
import Spinner from "../spinner";
import Button from "../links/button";
import { getButtonAppearance } from "utils/button";

import style from "./NewsletterSection.module.scss";

type NewsletterSectionProps = {
  data: NewsletterForm;
  form: FormsData;
};

const NewsletterSection: React.FC<NewsletterSectionProps> = (props) => {
  const { data, form } = props;
  const { title, cta, modalInfo } = data;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalHasEntered, setModalHasEntered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const activateModal = () => {
    setModalActive(true);
  };

  const onModalEnter = () => {
    setModalHasEntered(true);
  };

  const deactivateModal = () => {
    setModalHasEntered(false);
    (() => {
      setTimeout(() => {
        setModalActive(false);
      }, 1000);
    })();
  };

  const getApplicationNode = () => {
    const app = document.getElementById("App");
    if (!app) {
      throw new Error("App not found!");
    }
    return app;
  };

  const onLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <section className={`${style.section}`}>
      <div className={style.section__wrapper}>
        {title && <h2 className={style.section__title}>{title}</h2>}
        {cta && (
          <Button
            button={cta}
            appearance={getButtonAppearance(cta.type, "dark")}
            handleClick={activateModal}
          />
        )}
      </div>
      <AriaModal
        mounted={modalActive}
        onEnter={onModalEnter}
        onExit={deactivateModal}
        titleText={modalInfo.title}
        initialFocus="#ModalCloseButton"
        getApplicationNode={getApplicationNode}
        includeDefaultStyles={false}
      >
        <Modal
          isActive={modalHasEntered}
          onClose={deactivateModal}
        >
          <NewsletterModal
            content={modalInfo}
            form={form}
            onLoading={onLoading}
            id="NewsletterModal"
          ></NewsletterModal>
        </Modal>
      </AriaModal>
      {/* {loading && <Spinner />} */}
    </section>
  );
};

export default NewsletterSection;
