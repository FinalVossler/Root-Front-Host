import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { ITheme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import useStyles from "./columnOptions.styles";
import { BiHide } from "react-icons/bi";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

interface IColumnOptionsProps {
  handleHideColumn: () => void;
}

const ColumnOptions: React.FunctionComponent<IColumnOptionsProps> = (
  props: IColumnOptionsProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const optionsContainerRef = React.useRef(null);
  useOnClickOutside(optionsContainerRef, () => setShowOptions(false));

  return (
    <div className={styles.columnOptionsContainer}>
      <BsThreeDotsVertical
        className={styles.columnOptionsIcon}
        onClick={() => setShowOptions(!showOptions)}
      />

      {showOptions && (
        <div ref={optionsContainerRef} className={styles.optionsContainer}>
          <BiHide
            className={styles.hideColumnButton}
            onClick={props.handleHideColumn}
          />
        </div>
      )}
    </div>
  );
};

export default ColumnOptions;
