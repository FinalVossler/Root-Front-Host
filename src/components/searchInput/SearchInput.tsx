import React from "react";
import { useTheme } from "react-jss";
import { BsSearch } from "react-icons/bs";

import { Theme } from "../../config/theme";
import Input from "../input";

import useStyles from "./searchInput.styles";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface ISearchInput {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const SearchInput: React.FunctionComponent<ISearchInput> = (
  props: ISearchInput
) => {
  const [value, setValue] = React.useState("");
  const [showSearchResult, setShowSearchResult] =
    React.useState<boolean>(false);
  const [searchResult, setSearchResult] = React.useState([
    "sdfksfks",
    "sdfksfks",
    "sdfksfks",
    "sdfksfks",
    "sdfksfks",
  ]);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const searchBoxRef = React.useRef(null);
  useOnClickOutside(searchBoxRef, () => setShowSearchResult(false));

  //#region Event listeners
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowSearchResult(true);
  };

  const handleFocus = () => {
    if (searchResult.length > 0) setShowSearchResult(true);
  };
  //#region Event listeners

  return (
    <div className={styles.searchInputContainer}>
      <Input
        inputProps={{ ...props.inputProps, onFocus: handleFocus }}
        Icon={BsSearch}
        value={value}
        debounce
        onChange={handleValueChange}
      />
      {showSearchResult && value && (
        <div ref={searchBoxRef} className={styles.searchResultBox}>
          {searchResult.map((res, i) => (
            <span className={styles.singleResult} key={i}>
              {res}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchInput);
