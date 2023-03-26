import React from "react";
import PaginationComponent from "rc-pagination";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./pagination.styles";

interface IPagination {
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FunctionComponent<IPagination> = (
  props: IPagination
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  const handleOnChange = (page: number) => {
    console.log("page", page);
    props.onPageChange(page);
  };

  console.log("total", props.total);
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
