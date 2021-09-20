import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export type PopupPropsType = {
  setPopup: any,
  withClose?: boolean,
}

const Popup: React.FC<PopupPropsType> = ({
  setPopup,
  withClose = true,
  children
}) => {
  return (
    <div className="quickdetail__overlay">
      <div className="quickdetail__container">
        {withClose &&
          <span className="close-button" onClick={() => setPopup(false)}>
            <FontAwesomeIcon icon={faTimes} className="close-icon" />
          </span>
        }
        {children}
      </div>
    </div>
  )
}

export default Popup;