import React, { Children, cloneElement } from "react";
import {
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
  Portal,
  useDialogState
} from "reakit";
import styled from "styled-components";

const ModalBackdrop = styled(DialogBackdrop)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9998;
  transition: opacity 0.3s;
  opacity: 1;

  &.hidden {
    opacity: 0;
  }
`;

const StyledModal = styled(Dialog)`
  position: fixed;
  top: 28px;
  left: 50%;
  border-radius: 0.25rem;
  padding: 1em;
  max-height: 100vh;
  outline: 0;
  border: 1px solid black;
  color: black;
  background-color: white;
  z-index: 9999;
  transition: transform 0.3s, opacity 0.3s;
  transform: translateX(-50%) scale(1);
  opacity: 1;

  &.hidden {
    transform: translateX(-50%) scale(0.7);
    opacity: 0;
  }
`;

export default function Modal({ disclosure, children, ...props }) {
  const state = useDialogState({ unstable_animated: true });
  return (
    <>
      <DialogDisclosure {...state}>
        {disclosureProps =>
          cloneElement(Children.only(disclosure), disclosureProps)
        }
      </DialogDisclosure>
      {/**
       * FIXME: `ModalBackdrop` has a strange clipping issue when not wrapped in a `Portal`
       * @link https://github.com/reakit/reakit/issues/404
       */}
      {/* <Portal> */}
      <ModalBackdrop {...state} />
      {/* </Portal> */}
      <StyledModal {...state} hideOnClickOutside={false} {...props}>
        {typeof children === "function" ? children(state) : children}
      </StyledModal>
    </>
  );
}
