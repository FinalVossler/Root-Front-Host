import React from "react";
import { useTheme } from "react-jss";
import { BsSearch } from "react-icons/bs";

import { Theme } from "../../config/theme";
import Input from "../input";

import useStyles from "./searchInput.styles";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import PaginationCommand from "../../globalTypes/PaginationCommand";

interface ISearchInput {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  searchPromise: (
    searchText: string,
    paginationCommand: PaginationCommand
  ) => Promise<PaginationResponse<any>>;
  getElementTitle: (el: any) => string;
  onElementClick?: (el: any) => any;
}

const SearchInput: React.FunctionComponent<ISearchInput> = (
  props: ISearchInput
) => {
  const [value, setValue] = React.useState("");
  const [paginationCommand, setPaginationCommand] =
    React.useState<PaginationCommand>({
      limit: 100,
      page: 1,
    });
  const [showSearchResult, setShowSearchResult] =
    React.useState<boolean>(false);
  const [searchResult, setSearchResult] =
    React.useState<PaginationResponse<any>>();

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const searchBoxRef = React.useRef(null);
  useOnClickOutside(searchBoxRef, () => setShowSearchResult(false));

  // Trigger the search whenever the value changes
  React.useEffect(() => {
    const search = async () => {
      props.searchPromise(value, paginationCommand).then((res) => {
        setSearchResult(res);
      });
    };

    if (value && value.trim().length > 2) {
      search();
    }
  }, [value, paginationCommand, props.searchPromise, setSearchResult]);

  //#region Event listeners
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowSearchResult(true);
  };

  const handleFocus = () => {
    if (searchResult && searchResult?.data.length > 0)
      setShowSearchResult(true);
  };

  const handleElementClick = (el: any) => {
    if (props.onElementClick) {
      props.onElementClick(el);
      setShowSearchResult(false);
    }
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
      />
      {showSearchResult && value && (
        <div className={styles.searchResultBox}>
          {searchResult?.data.map((el, i) => (
            <span
              onClick={() => handleElementClick(el)}
              className={styles.singleResult}
              key={i}
            >
              {props.getElementTitle(el)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchInput);
