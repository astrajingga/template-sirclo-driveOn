import { useState } from "react";
import { useI18n } from "@sirclo/nexus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ searchProduct }: any) => {
  const i18n: any = useI18n();
  const [searchValue, setSearchValue] = useState<string>("")

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchProduct(searchValue);
        }}
        className="search-form"
      >
        <input
          type="text"
          className="mr-2"
          placeholder={i18n.t("header.searchPlaceholder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="btn btn-search">
          <FontAwesomeIcon
            className="icon-search"
            icon={faSearch}
          />
        </button>
      </form>
    </div>
  )
}

export default Search;