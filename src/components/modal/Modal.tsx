import React from "react";
import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./modal.styles";

interface IModal extends React.PropsWithChildren {
  open: Boolean;
  handleClose: any;
}

const Modal: React.FunctionComponent<IModal> = (props: IModal) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  const handleLayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.handleClose();
  };

  if (!props.open) return null;

  return (
    <div className={styles.modalContainer}>
      <div onClick={handleLayerClick} className={styles.layer}></div>

      <div className={styles.modal}>{props.children}</div>
    </div>
  );
};

export default React.memo(Modal);
