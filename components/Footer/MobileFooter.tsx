import { useState } from 'react'
import { Widget, NewsletterForm, useI18n } from '@sirclo/nexus'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const newsletterClasses = {
  containerClassName: "newsletter",
  labelClassName: "newsletter-label",
  inputClassName: "newsletter-input",
  buttonClassName: "btn btn-orange btn-full-width",
};

const classesWidget = "footer__widget footer__widget-links footer__mobile-widget d-lg-none d-md-block"

const MobileFooter = () => {
  const i18n: any = useI18n();
  const [widgetActive, setWidgetActive] = useState<string>('')

  const toggleFooter = (widgetPar: string) => {
    setWidgetActive(widgetActive !== widgetPar ? widgetPar : "")
  }

  const toggleIcon = (widgetPar: string) => (
    <FontAwesomeIcon
      className="icon-down-footer"
      icon={widgetActive == widgetPar ? faAngleUp : faAngleDown}
      onClick={() => toggleFooter(widgetPar)}
    />
  )

  return (
    <>
      <div className="col-md-12 position-relative">
        <Widget
          pos="footer-1"
          widgetClassName={`${classesWidget} ${widgetActive === "widget-1" && "widget-1"}`}
        />
        <div className="d-lg-none d-md-flex">
          {toggleIcon('widget-1')}
        </div>
      </div>
      <div className="col-md-12 position-relative">
        <Widget
          pos="footer-2"
          widgetClassName={`${classesWidget} ${widgetActive === "widget-2" && "widget-2"}`}
        />
        <div className="d-lg-none d-md-flex">
          {toggleIcon('widget-2')}
        </div>
      </div>
      <div className="col-md-12 position-relative">
        <Widget
          pos="footer-3"
          widgetClassName={`${classesWidget} ${widgetActive === "widget-3" && "widget-3"}`}
        />
        <div className="d-lg-none d-md-flex">
          {toggleIcon('widget-3')}
        </div>
      </div>
      <div className="col-md-12 position-relative d-none">
        <div className={`${classesWidget} ${widgetActive === "widget-4" ? "widget-4" : "col-md-12"}`}>
          <h3>{i18n.t("footer.newsletter")}</h3>
          <div className="newsletter-mobile">
            <p>{i18n.t("footer.newsletterDesc")}</p>
            <NewsletterForm
              classes={newsletterClasses}
              buttonComponent={<>{i18n.t("footer.subscribe")}</>}
            />
          </div>
        </div>
        <div className="d-lg-none d-md-block">
          {toggleIcon('widget-4')}
        </div>
      </div>
    </>
  )
}

export default MobileFooter;