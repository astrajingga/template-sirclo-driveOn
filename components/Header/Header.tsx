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
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Router from "next/router";

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

  const [showAnnounce, setShowAnnounce] = useState<boolean>(true);
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null);

  const searchProduct = (val: string) => {
    if (val !== "" && typeof val !== "undefined") {
      Router.push(`/${lng}/products?q=${val}`);
    } else {
      Router.push(`/${lng}/products`);
    }
  };


  return (
    <>
      {(countWidgetAnnouncement === null || countWidgetAnnouncement > 0) &&
        <div className="announce" style={{ display: showAnnounce ? 'block' : 'none' }}>
          <span className="announce__close">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={() => setShowAnnounce(false)}
            />
          </span>
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
            <ProfileMenu
              lng={lng}
              actionLogout={logout}
              searchProduct={searchProduct}
            />
          </div>
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
