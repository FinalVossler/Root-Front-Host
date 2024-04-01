import { ITheme } from "roottypes";
import { useAppSelector } from "../../../../store/hooks";
import React from "react";
import useStyles from "./elementsTable.styles";

export const PAGE_PADDING = 100;

const useColumnStyle = () => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [offsetLeft, setOffsetLeft] = React.useState<number>(0);
  const columnRef: React.LegacyRef<HTMLTableHeaderCellElement> =
    React.useRef<HTMLTableHeaderCellElement>(null);

  const styles = useStyles({
    theme: {
      ...theme,
      resizerLeftStick:
        offsetLeft + (columnRef.current?.clientWidth || 0) - PAGE_PADDING,
    },
  });

  React.useEffect(() => {
    setOffsetLeft(columnRef.current?.offsetLeft || 0);
  }, [columnRef.current?.offsetLeft]);

  return { styles, stickLeft: offsetLeft - PAGE_PADDING, columnRef };
};

export default useColumnStyle;
