import React from "react";
import PaginationComponent from "rc-pagination";
import { ITheme } from "roottypes";

import useStyles from "./pagination.styles";

interface IPaginationProps {
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  theme: ITheme;
}

const Pagination: React.FunctionComponent<IPaginationProps> = (
  props: IPaginationProps
) => {
  const styles = useStyles({ theme: props.theme });

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
