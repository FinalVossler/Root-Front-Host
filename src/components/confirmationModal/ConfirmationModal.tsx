import React from "react";
import ReactLoading from "react-loading";

import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import Button from "../button";

import useStyles from "./confirmationModal.styles";

interface IConfirmationModalProps {
  onConfirm: () => void;
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  loading: boolean;
}

const ConfirmationModal: React.FunctionComponent<
  React.PropsWithChildren<IConfirmationModalProps>
> = (props: React.PropsWithChildren<IConfirmationModalProps>) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  const handleClose = () => {
    props.setModalOpen(false);
  };

  if (!props.modalOpen) return null;

  return (
    <div className={styles.confirmationModalContainer}>
      <div className={styles.layer} />

      <div className={styles.confirmationModal}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.description}>{props.description}</p>
        {props.loading && <ReactLoading />}
        <div className={styles.buttonsContainer}>
          {!props.loading && (
            <Button
              buttonDataCy="confirmationModalConfirmButton"
              disabled={props.loading}
              onClick={props.onConfirm}
            >
              Yes
            </Button>
          )}

          <Button disabled={props.loading} onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfirmationModal);
