import React from "react";
import PaginationComponent from "rc-pagination";

import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./pagination.styles";

interface IPaginationProps {
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FunctionComponent<IPaginationProps> = (
  props: IPaginationProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  const handleOnChange = (page: number) => {
    props.onPageChange(page);
  };

  if (props.total <= props.limit) return null;

  return (
    <div className={styles.paginationContainer}>
      <PaginationComponent
        total={props.total}
        onChange={handleOnChange}
        pageSize={props.limit}
        current={props.page}
      />
    </div>
  );
};

export default Pagination;
