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
// import PremiumFeatures from "../PremiumFeatures/PremiumFeatures";

const SideMenu = dynamic(() => import("../SideMenu/SideMenu"));
const CartSideMenu = dynamic(() => import("../CartSideMenu/CartSideMenu"));
const DropdownNav = dynamic(() => import("./DropdownNav"));
const Search = dynamic(() => import("./Search"));

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
  actionLogout,
  searchProduct
}) => {
  const router = useRouter();

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const i18n: any = useI18n();
  const { data } = useCart();

  useEffect(() => {
    setOpenSearch(false);
  }, [router.query]);

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
      <DropdownNav
        title={<FontAwesomeIcon className="nav--icon" icon={faUser} />}
      >
        <PrivateComponent
          Auth={
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
          }
          NoAuth={
            <div
              className="menu-link"
              onClick={() => router.push(`/[lng]/login`, `/${lng}/login`)}
            >
              <a
                className="dropdown-link"
                onClick={(e) => e.preventDefault()}
                href="#"
              >
                {i18n.t("header.login")}
              </a>
            </div>
          }
        />
      </DropdownNav>
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
      {/* <DropdownNav
        title={<span style={{ textTransform: "uppercase" }}>{lng}</span>}
      >
        <div className="menu">
          <PremiumFeatures>
            <label className="menu-title">{i18n.t("header.currency")}</label>
            <div className="currency">
              <CurrencySelector
                classes={classesCurrencySelector}
                type="list"
                separator=""
              />
            </div>
          </PremiumFeatures>
          <label className="menu-title">{i18n.t("header.language")}</label>
          <div className="language">
            <LanguageSelector
              classes={classesLanguageSelector}
              type="list"
              lng={`${lng}`}
              separator=""
              withCurrency={false}
            />
          </div>
        </div>
      </DropdownNav> */}
      <SideMenu
        title={i18n.t("header.shoppingCart")}
        openSide={openCart}
        toogleSide={toogleCart}
        positionSide="right"
      >
        <CartSideMenu />
      </SideMenu>
      <SideMenu
        title={i18n.t("header.searchProduct")}
        openSide={openSearch}
        toogleSide={toogleSearch}
        positionSide="right"
      >
        <Search searchProduct={searchProduct} />
      </SideMenu>
    </div>
  );
};

export default ProfileMenu;
