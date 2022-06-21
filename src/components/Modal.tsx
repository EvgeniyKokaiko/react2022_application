import React from "react";
import ReactDOM from "react-dom";

interface IProps {
  showModal(modal: number): any;
  modalData(): JSX.Element;
}

const Modal = (props: IProps) => {
  return ReactDOM.createPortal(
    <div
      className="ui dimmer modals visible active modalWindow"
      onClick={() => props.showModal(0)}
    >
      {props.modalData()}
    </div>,
    document.querySelector("#modal") as HTMLElement
  );
};

export default Modal;
