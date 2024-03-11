import React from "react";
import { ITheme } from "roottypes";

import useStyles from "./modal.styles";

interface IModalProps {
  open: Boolean;
  handleClose: any;
  theme: ITheme;
}

const Modal: React.FunctionComponent<React.PropsWithChildren<IModalProps>> = (
  props: React.PropsWithChildren<IModalProps>
) => {
  const styles = useStyles({ theme: props.theme });

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
