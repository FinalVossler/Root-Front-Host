import React from "react";
import { BsSearch } from "react-icons/bs";

import { ITheme } from "../../config/theme";
import Input from "../input";

import useStyles from "./searchInput.styles";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../pagination";

interface ISearchInputProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  searchPromise: (
    searchText: string,
    paginationCommand: PaginationCommand
  ) => Promise<PaginationResponse<any>>;
  getElementTitle: (el: any) => string;
  onElementClick?: (el: any) => any;
  setSearchResult?: any;
  label?: string;
  showSearchResult?: boolean;
  inputDataCy?: string;
}

const LIMIT = 10;

const SearchInput: React.FunctionComponent<ISearchInputProps> = (
  props: ISearchInputProps
) => {
  const [value, setValue] = React.useState("");
  const [paginationCommand, setPaginationCommand] =
    React.useState<PaginationCommand>({
      limit: LIMIT,
      page: 1,
    });
  const [showSearchResult, setShowSearchResult] =
    React.useState<boolean>(false);
  const [searchResult, setSearchResult] = React.useState<
    PaginationResponse<any>
  >({ data: [], total: 0 });

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const searchBoxRef = React.useRef(null);
  useOnClickOutside(searchBoxRef, () => setShowSearchResult(false));

  // Trigger the search whenever the value changes
  React.useEffect(() => {
    if (value && value.trim().length > 2) {
      handleSearch();
    }
    if (value.trim().length <= 2) {
      setSearchResult({ data: [], total: 0 });
    }
  }, [value]);

  // Trigger the search whenever the pagination command changes
  React.useEffect(() => {
    if (value && value.trim().length > 2) {
      handleSearch();
    }
  }, [paginationCommand]);

  React.useEffect(() => {
    if (searchResult && props.setSearchResult) {
      props.setSearchResult(searchResult);
    }
  }, [searchResult, props.setSearchResult]);

  //#region Event listeners
  const handleSearch = () => {
    props.searchPromise(value, paginationCommand).then((res) => {
      setSearchResult(res);
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowSearchResult(true);
  };

  const handleFocus = () => {
    if (searchResult && searchResult?.data.length > 0)
      setShowSearchResult(true);
  };

  const handleElementClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    el: any
  ) => {
    e.preventDefault();
    if (props.onElementClick) {
      props.onElementClick(el);
      setShowSearchResult(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPaginationCommand({
      limit: LIMIT,
      page,
    });
  };
  //#region Event listeners

  return (
    <div ref={searchBoxRef} className={styles.searchInputContainer}>
      <Input
        inputProps={{ ...props.inputProps }}
        Icon={BsSearch}
        value={value}
        debounce
        onChange={handleValueChange}
        onFocus={handleFocus}
        label={props.label}
        {...(props.inputDataCy ? { inputDataCy: props.inputDataCy } : {})}
      />
      {showSearchResult &&
        (props.showSearchResult === undefined ||
          props.showSearchResult === true) &&
        value && (
          <div className={styles.searchResultBox}>
            {searchResult?.data.map((el, i) => (
              <span
                onClick={(e) => handleElementClick(e, el)}
                className={styles.singleResult}
                key={i}
                {...(el["_id"]
                  ? { ["data-cy"]: "searchResult" + el["_id"].toString() }
                  : {})}
              >
                {props.getElementTitle(el)}
              </span>
            ))}

            <Pagination
              page={paginationCommand.page}
              onPageChange={handlePageChange}
              limit={LIMIT}
              total={searchResult?.total || 0}
            />
          </div>
        )}
    </div>
  );
};

export default React.memo(SearchInput);
