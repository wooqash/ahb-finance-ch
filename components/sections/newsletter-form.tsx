import AriaModal from "react-aria-modal";
import { NewsletterForm } from "types/sections-data";
import { useState } from "react";
import Modal from "../Modal/modal";
import ModalHeader from "../Modal/modal-header";
import ModalTitle from "../Modal/modal-title";
import ModalContent from "../Modal/modal-content";
import ModalNewsletter from "../Modal/contents/modal-newsletter";
import { FormsData } from "types/forms-data";
import Spinner from "../spinner";
import Button from "../links/button";
import { getButtonAppearance } from "utils/button";

type NewsletterFromProps = {
  data: NewsletterForm;
  form: FormsData;
};

const NewsletterFrom: React.FC<NewsletterFromProps> = (props) => {
  const { data, form } = props;
  const { title, cta, modalInfo } = data;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalHasEntered, setModalHasEntered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(form);

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
    <section>
      {title && <h2>{title}</h2>}
      {cta && (
        <Button
          button={cta}
          appearance={cta ? getButtonAppearance(cta.type, "light") : ""}
          handleClick={activateModal}
        />
      )}
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
          id="CookieConsentModal"
          onClose={deactivateModal}
        >
          <ModalHeader onClose={deactivateModal}>
            {modalInfo.title && (
              <ModalTitle className="my-0" id="NewsletterTitle">
                {modalInfo.title}
              </ModalTitle>
            )}
          </ModalHeader>
          <ModalContent>
            <ModalNewsletter
              content={modalInfo}
              form={form}
              //   logo={mainLogo}
              onLoading={onLoading}
            ></ModalNewsletter>
          </ModalContent>
        </Modal>
      </AriaModal>
      {loading && <Spinner />}
    </section>
  );
};

export default NewsletterFrom;
