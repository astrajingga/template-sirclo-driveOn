/* library Package */
import { Logo } from '@sirclo/nexus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

const SideMenu = ({ title, openSide, toogleSide, children, positionSide }) => {
  return (
    <>
      <div
        className={
          openSide ? `side-menu fade show ${positionSide}` : `side-menu fade`
        }
      >
        <div className="header-side-menu">
          <LazyLoadComponent>
            <Logo
              imageClassName="nav-logo"
              thumborSetting={{
                width: 100,
                format: "webp",
                quality: 100,
              }}
           />
          </LazyLoadComponent>
          
          <FontAwesomeIcon
            className="icon"
            icon={faTimes}
            onClick={toogleSide}
          />
        </div>
        <hr className="side-menu-hr" />
        {children}
      </div>
      <div
        className="bg-outside"
        style={{ display: openSide ? "block" : "none" }}
        onClick={toogleSide}
      ></div>
    </>
  );
};

export default SideMenu;
