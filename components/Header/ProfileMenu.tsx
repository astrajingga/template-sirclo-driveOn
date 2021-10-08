import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart, useI18n } from "@sirclo/nexus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Router from "next/router";
import styles from "public/scss/components/Header.module.scss";
// import PremiumFeatures from "../PremiumFeatures/PremiumFeatures";

const SideMenu = dynamic(() => import("../SideMenu/SideMenu"));
const CartSideMenu = dynamic(() => import("../CartSideMenu/CartSideMenu"));
const DropdownNav = dynamic(() => import("./DropdownNav"));

const Search = dynamic(() => import("./Search"));

const classesSearch = {
  searchContainer: styles.search_container,
  searchInputContainer: styles.search_inputContainer,
  searchInput: `form-control ${styles.sirclo_form_input} ${styles.search_inputText}`,
  searchClear: `btn ${styles.search_buttonClear}`,
  searchButton: styles.search_buttonSearch,
  searchForm: styles.search_form,
};


// const CurrencySelector = dynamic(() =>
//   import("@sirclo/nexus").then((mod) => mod.CurrencySelector)
// );
// const LanguageSelector = dynamic(() =>
//   import("@sirclo/nexus").then((mod) => mod.LanguageSelector)
// );
const PrivateComponent = dynamic(() =>
  import("@sirclo/nexus").then((mod) => mod.PrivateComponent)
);

// const classesCurrencySelector = {
//   currencyContainerClassName: "currency__unordered",
//   currencyItemClassName: "currency__unordered--list",
//   currencyButtonSelectedClassName:
//     "currency__unordered--list-button currency__unordered--list-button-selected",
//   currencyButtonClassName: "currency__unordered--list-button",
// };

// const classesLanguageSelector = {
//   languageContainerClassName: "language__unordered",
//   languageItemClassName: "language__unordered--list",
//   languageButtonSelectedClassName:
//     "language__unordered--list-button language__unordered--list-button-selected",
//   languageButtonClassName: "language__unordered--list-button",
// };

const ProfileMenu = ({
  lng,
  actionLogout

}) => {
  const router = useRouter();

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const Popup = dynamic(() => import("../Popup/PopupUno"));
  const Search = dynamic(() => import("./Search"));
  

  const i18n: any = useI18n();
  const { data } = useCart();

  useEffect(() => {
    setOpenSearch(false);
  }, [router.query]);

  const searchProduct = (val: any) => {
    if (val !== "" && typeof val !== "undefined") {
      Router.push(`/${lng}/products?q=${val}`);
      setOpenSearch(false);
    } else {
      Router.push(`/${lng}/products`);
      setOpenSearch(false);
    }
  };

  const toogleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const toogleCart = () => {
    const linkRedirectToCart = [
      "/[lng]/cart",
      "/[lng]/place_order",
      "/[lng]/shipping_method",
      "/[lng]/payment_method",
    ];

    if (linkRedirectToCart.includes(router.pathname)) {
      router.push(`/[lng]/cart`, `/${lng}/cart`);
    } else if (router.pathname === "/[lng]/payment_notif/[orderID]") {
      setOpenCart(false);
    } else {
      setOpenCart(!openCart);
    }
  };

  return (
    <div className="navbar-profile-menu">
      <a
        onClick={(e) => e.preventDefault()}
        href="#"
        style={{marginRight : 30}}
      >
        <FontAwesomeIcon
          className="nav--icon ml-4"
          icon={faSearch}
          onClick={toogleSearch}
        />
      </a>

      <div>
        <PrivateComponent
          Auth={
            <DropdownNav
              title={<FontAwesomeIcon className="nav--icon" icon={faUser} />}
            >
            <>
              <div
                className="menu-link"
                onClick={() => router.push(`/[lng]/account`, `/${lng}/account`)}
              >
                <a
                  className="dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  href="#"
                >
                  {i18n.t("header.myAccount")}
                </a>
              </div>
              <div
                className="menu-link"
                onClick={actionLogout}
              >
                <a
                  className="dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  href="#"
                >
                  {i18n.t("header.logout")}
                </a>
              </div>
            </>
              </DropdownNav>
          }
          NoAuth={
            <button  onClick={() => router.push(`/[lng]/login`, `/${lng}/login`)} className="btn btn-danger">Login</button>
            // <div
            //   className="menu-link"
            //   onClick={() => router.push(`/[lng]/login`, `/${lng}/login`)}
            // >
            //   <a
            //     className="dropdown-link"
            //     onClick={(e) => e.preventDefault()}
            //     href="#"
            //   >
            //     {i18n.t("header.login")}
            //   </a>
            // </div>
          }
        />
      </div>
      <a
        className="navbar-profile-menu__cart"
        onClick={(e) => e.preventDefault()}
        href="#"
      >
        <FontAwesomeIcon
          className="nav--icon ml-4"
          icon={faShoppingCart}
          onClick={toogleCart}
        />
        <span className="badge-cart" onClick={toogleCart}>
          {data?.totalItem}
        </span>
      </a>
      {openSearch && (
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
          )}
      <SideMenu
        title={i18n.t("header.shoppingCart")}
        openSide={openCart}
        toogleSide={toogleCart}
        positionSide="right"
      >
        <CartSideMenu />
      </SideMenu>      
    </div>
  );
};

export default ProfileMenu;
