import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Logo, useI18n } from "@sirclo/nexus";
import SideMenu from "../SideMenu/SideMenu";
import MobileShortcut from "./MobileShortcut";
import Placeholder from "../Placeholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import dynamic from "next/dynamic";
import Router from "next/router";
import styles from "public/scss/components/Header.module.scss";

// const CurrencySelector = dynamic(() => import("@sirclo/nexus").then((mod) => mod.CurrencySelector));
// const LanguageSelector = dynamic(() => import("@sirclo/nexus").then((mod) => mod.LanguageSelector));
const CollapsibleNav = dynamic(() =>
  import("@sirclo/nexus").then((mod) => mod.CollapsibleNav)
);
const PrivateComponent = dynamic(() =>
  import("@sirclo/nexus").then((mod) => mod.PrivateComponent)
);

const Popup = dynamic(() => import("../Popup/PopupUnoMobile"));
const Search = dynamic(() => import("./Search"));

const classesCollapsibleNav = {
  parentNavClassName: "menu-mobile",
  navItemClassName: "menu-mobile__item",
  selectedNavClassName: "menu-mobile__itemActive",
  dropdownIconClassName: "icon-down-mobile",
  childNavClassName: "menu-mobile__sub",
  subChildNavClassName: "menu-mobile__sub",
};


const classesSearch = {
  searchContainer: styles.search_container,
  searchInputContainer: styles.search_inputContainer,
  searchInput: `form-control ${styles.sirclo_form_input} ${styles.search_inputText}`,
  searchClear: `btn ${styles.search_buttonClear}`,
  searchButton: styles.search_buttonSearch,
  searchForm: styles.search_form,
};

// const classesCurrencySelector = {
//   currencyContainerClassName: "currency__unordered currency__unordered--mobile d-none",
//   currencyItemClassName: "currency__unordered--list currency__unordered--list-mobile",
//   currencyButtonSelectedClassName: "currency__unordered--list-button currency__unordered--list-button-selected-mobile",
//   currencyButtonClassName: "currency__unordered--list-button",
// }

// const classesLanguageSelector = {
//   languageContainerClassName: "language__unordered language__unordered--mobile",
//   languageItemClassName: "language__unordered--list language__unordered--list-mobile",
//   languageButtonSelectedClassName: "language__unordered--list-button language__unordered--list-button-selected-mobile",
//   languageButtonClassName: "language__unordered--list-button"
// }

const classesPlaceholderCollapsibleNav = {
  placeholderList: "placeholder-item placeholder-item__header--nav-mobile",
};

const MobileNavButton = ({ lng, actionLogout }) => {
  const i18n: any = useI18n();
  const router = useRouter();

  const searchProduct = (val: any) => {
    if (val !== "" && typeof val !== "undefined") {
      Router.push(`/${lng}/products?q=${val}`);
      setOpenSearch(false);
    } else {
      Router.push(`/${lng}/products`);
      setOpenSearch(false);
    }
  };
  
  const toogleSearch = () => setOpenSearch(!openSearch);

  // const [openCurLang, setOpenCurLang] = useState<boolean>(false)
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  useEffect(() => {
    setOpenMenu(false);
    setOpenSearch(false);
  }, [router.query]);

  const toogleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div className="navbar-mobile d-lg-none d-md-flex">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="navbar-mobile__icon">
              <FontAwesomeIcon
                className="mobile-menu-icon"
                icon={faBars}
                onClick={toogleMenu}
              />
            </div>
            <div className="navbar-mobile__logo">
              <LazyLoadComponent
                placeholder={<div className="nav-logo__placeholder"></div>}
              >
                <Logo
                  imageClassName="nav-logo"
                  thumborSetting={{
                    width: 400,
                    format: "webp",
                    quality: 85,
                  }}
                />
              </LazyLoadComponent>
            </div>
            <div className="navbar-mobile__icon">
              <FontAwesomeIcon
                className="mobile-menu-icon"
                icon={faSearch}
                onClick={toogleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      {openSearch &&
          <Popup
            withHeader
            setPopup={toogleSearch}
            mobileFull
            classPopopBody
            popupTitle={i18n.t("header.searchProduct")}
          >
            <Search
              classes={classesSearch}
              searchProduct={searchProduct}
              visibleState={openSearch}
            />
          </Popup>
      }
      <SideMenu
        title={i18n.t("header.menu")}
        openSide={openMenu}
        toogleSide={toogleMenu}
        positionSide="left"
      >
        {/* <div className="currency-language-mobile">
          <div className="currency-language-mobile__label">
            <span>{i18n.t("header.language")}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="icon-down-mobile--svg"
              onClick={() => setOpenCurLang(!openCurLang)}
            />
          </div>
          {openCurLang &&
            <>
              <CurrencySelector
                classes={classesCurrencySelector}
                type="list"
                separator=""
              />
              <hr className="ml-3 d-none" />
              <LanguageSelector
                classes={classesLanguageSelector}
                type="list"
                lng={`${lng}`}
                separator=""
                withCurrency={false}
              />
            </>
          }
        </div> */}
        <CollapsibleNav
          dropdownIcon={
            <FontAwesomeIcon
              icon={faChevronDown}
              className="icon-down-mobile--svg"
            />
          }
          dropdownOpenIcon={
            <FontAwesomeIcon
              icon={faChevronUp}
              className="icon-down-mobile--svg"
            />
          }
          classes={classesCollapsibleNav}
          loadingComponent={
            <>
              <Placeholder
                classes={classesPlaceholderCollapsibleNav}
                withList={true}
                listMany={4}
              />
            </>
          }
        />
        <PrivateComponent
          Auth={
            <>
              <hr />
              <span onClick={actionLogout}>{i18n.t("header.logout")}</span>
            </>
          }
          NoAuth={<span></span>}
        />
      </SideMenu>
      <MobileShortcut lng={lng} />
    </>
  );
};

export default MobileNavButton;
