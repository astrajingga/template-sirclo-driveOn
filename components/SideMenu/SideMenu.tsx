import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SideMenu = ({ title, openSide, toogleSide, children, positionSide }) => {
  return (
    <>
      <div className={openSide ? `side-menu fade show ${positionSide}` : `side-menu fade`}>
        <div className="header-side-menu">
          <h6>{title}</h6>
          <FontAwesomeIcon
            className="icon"
            icon={faTimes}
            onClick={toogleSide}
          />
        </div>
        <hr className="side-menu-hr" />
        {children}
      </div>
      <div className="bg-outside" style={{ display: openSide ? 'block' : 'none' }} onClick={toogleSide}></div>
    </>
  )
}

export default SideMenu;