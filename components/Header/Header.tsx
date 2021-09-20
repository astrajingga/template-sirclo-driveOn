import {
  Logo,
  Navigation,
  Widget,
  useLogout
} from "@sirclo/nexus";
import ProfileMenu from "./ProfileMenu";
import MobileNavButton from "./MobileNav";
import Placeholder from "../Placeholder";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useI18n } from "@sirclo/nexus";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import styles from "public/scss/components/Header.module.scss";


const navClasses = {
  dropdownContainerClassName: "dropdown-container",
  navItemClassName: "nav-item line-merlin",
  navLinkClassName: "nav-link nav-link-merlin",
  navbarUlClassName: "navbar-nav navbar-merlin",
  subChildClassName: "subchild",
  withChildClassName: "withchild"
}


const classesPlaceholderWidget = {
  placeholderTitle: "placeholder-item placeholder-item__header--widget"
}

const classesPlaceholderLogo = {
  placeholderImage: "placeholder-item placeholder-item__header--logo"
}

const classesPlaceholderNav = {
  placeholderList: "placeholder-item placeholder-item__header--nav"
}

const Header = ({ lng }) => {
  const logout = useLogout('login');
  const router = useRouter();

  const [showAnnounce, setShowAnnounce] = useState<boolean>(true);
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null);

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  
  const Popup = dynamic(() => import("../Popup/Popup"));
  const Search = dynamic(() => import("./Search"));
  const i18n: any = useI18n();

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

  const classesSearch = {
    searchContainer: styles.search_container,
    searchInputContainer: styles.search_inputContainer,
    searchInput: `form-control ${styles.sirclo_form_input} ${styles.search_inputText}`,
    searchClear: `btn ${styles.search_buttonClear}`,
    searchButton: styles.search_buttonSearch,
    searchForm: styles.search_form
  }



  return (
    <>
      {(countWidgetAnnouncement === null || countWidgetAnnouncement > 0) &&
        <div className="announce" style={{ display: showAnnounce ? 'block' : 'none' }}>
          {/* <span className="announce__close"> */}
            {/* <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={() => setShowAnnounce(false)}
            /> */}
          {/* </span> */}
          <Widget
            getItemCount={(itemCount: number) => setCountWidgetAnnouncement(itemCount)}
            pos="header-announcements"
            widgetClassName="announce__items"
            loadingComponent={<Placeholder classes={classesPlaceholderWidget} withTitle />}
          />
        </div>
      }
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light nav-merlin d-none d-lg-flex">
          <div className="container">
            <LazyLoadComponent
              placeholder={
                <Placeholder classes={classesPlaceholderLogo} withImage={true} />
              }
            >
              <Logo
                imageClassName="nav-logo"
                thumborSetting={{
                  width: 400,
                  format: 'webp',
                  quality: 85
                }}
              />
            </LazyLoadComponent>
            <Navigation
              classes={navClasses}
              loadingComponent={
                <div className="d-flex">
                  <Placeholder
                    classes={classesPlaceholderNav}
                    withList={true}
                    listMany={4}
                  />
                </div>
              }
            />
          <a
            onClick={(e) => e.preventDefault()}
            href="#"
            >
            <FontAwesomeIcon
              className="nav--icon ml-4"
              icon={faSearch}
              onClick={toogleSearch}
            />
          </a>
            <ProfileMenu
              lng={lng}
              actionLogout={logout}
              searchProduct={searchProduct}
            />
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
        </nav>
        <MobileNavButton
          lng={lng}
          actionLogout={logout}
          searchProduct={searchProduct}
        />
      </header>
    </>
  );
};

export default Header;
