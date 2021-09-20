import Link from "next/link";
import { useRouter } from "next/router";
import { useI18n, useCart, PrivateComponent } from "@sirclo/nexus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faThLarge,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const MobileShortcut = ({ lng }) => {
  const i18n: any = useI18n();
  const router = useRouter();

  const { data } = useCart();

  return (
    <div
      className={`
      navbar-mobile__shortcut d-lg-none 
      ${(router.pathname === "/[lng]/cart" ||
          router.pathname === "/[lng]/place_order" ||
          router.pathname === "/[lng]/shipping_method") &&
        "d-none"
        }
    `}
    >
      <div className="navbar-mobile__shortcut--inner">
        <div className="navbar-mobile__shortcut--item">
          <Link href="/[lng]" as={`/${lng}`}>
            <a>
              <FontAwesomeIcon className="icon-item" icon={faHome} />
              <span className="icon-title">{i18n.t("header.home")}</span>
            </a>
          </Link>
        </div>
        <div className="navbar-mobile__shortcut--item">
          <Link href="/[lng]/products" as={`/${lng}/products`}>
            <a>
              <FontAwesomeIcon className="icon-item" icon={faThLarge} />
              <span className="icon-title">{i18n.t("header.shop")}</span>
            </a>
          </Link>
        </div>
        <div className="navbar-mobile__shortcut--item">
          <Link href="/[lng]/cart" as={`/${lng}/cart`}>
            <a>
              <span style={{ position: "relative" }}>
                <FontAwesomeIcon className="icon-item" icon={faShoppingBag} />
                <div className="icon-badge">{data?.totalItem}</div>
              </span>
              <span className="icon-title">{i18n.t("header.cart")}</span>
            </a>
          </Link>
        </div>
        <div className="navbar-mobile__shortcut--item">
          <PrivateComponent
            Auth={
              <Link href="/[lng]/account" as={`/${lng}/account`}>
                <a>
                  <FontAwesomeIcon className="icon-item" icon={faUser} />
                  <span className="icon-title">{i18n.t("header.account")}</span>
                </a>
              </Link>
            }
            NoAuth={
              <Link href="/[lng]/login" as={`/${lng}/login`}>
                <a>
                  <FontAwesomeIcon className="icon-item" icon={faUser} />
                  <span className="icon-title">{i18n.t("header.login")}</span>
                </a>
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MobileShortcut;
