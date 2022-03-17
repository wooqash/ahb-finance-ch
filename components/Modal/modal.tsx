import Image from "next/image";
import React, { ReactNode, MouseEvent } from "react";
import { MdClose } from "react-icons/md";

import style from "./Modal.module.scss";

import Watermark from "public/images/wartermark-pig-modal.svg";

type ModalProps = {
  isActive: boolean;
  children?: ReactNode;
  id?: string;
  onClose?: (e: MouseEvent<HTMLElement>) => void;
};

const Modal: React.FC<ModalProps> = ({ isActive, children, id, onClose }) => {
    console.log(isActive);
  return (
    <div
      id={id}
      className={`${style.dialog}`}
    >
      <div className={`${style.dialog__overlay} ${
            isActive ? style["dialog__overlay--show"] : style["dialog__overlay--hide"]
          }`} onClick={onClose}></div>
      <div
        className={`${style.dialog__content} ${
            isActive ? style["dialog--scaleUp"] : style["dialog--scaleDown"]
          }`}
      >
        <button
          id="ModalCloseButton"
          aria-label="close"
          name="ModalCloseButton"
          onClick={onClose}
          className={style["dialog__close-btn"]}
        >
          <MdClose />
        </button>
        <div className={style["dialog__content-container"]}>{children}</div>
        <div className={style.dialog__watermark}>
          <Image src={Watermark} alt={`transparent pig watermark`} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
