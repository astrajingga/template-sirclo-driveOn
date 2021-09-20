import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type StepperPropType = {
  pageTitle: string;
  nextPage?: string;
  i18n: any;
  step: number;
};

const Stepper = ({ step, pageTitle, nextPage, i18n }: StepperPropType) => {
  return (
    <>
      <div className="d-none d-md-flex stepper">
        <div className="stepper__items">
          <span className={`stepper__items--number ${step === 1 && "stepper__items--number-active"}`}>1</span>
          <span className={`stepper__items--title ${step === 1 && "stepper__items--title-active"}`}>
            {i18n.t("pageStepper.customerInfo")}
          </span>
        </div>
        <div className="stepper__break">
          <FontAwesomeIcon icon={faChevronRight} className={`stepper__break--icon ${step === 1 && "stepper__break--icon-active"}`} />
        </div>
        <div className="stepper__items">
          <span className={`stepper__items--number ${step === 2 && "stepper__items--number-active"}`}>2</span>
          <span className={`stepper__items--title ${step === 2 && "stepper__items--title-active"}`}>
            {i18n.t("pageStepper.shippingDetails")}
          </span>
        </div>
        <div className="stepper__break">
          <FontAwesomeIcon icon={faChevronRight} className={`stepper__break--icon ${step === 2 && "stepper__break--icon-active"}`} />
        </div>
        <div className="stepper__items">
          <span className={`stepper__items--number ${step === 3 && "stepper__items--number-active"}`}>3</span>
          <span className={`stepper__items--title ${step === 3 && "stepper__items--title-active"}`}>
            {i18n.t("pageStepper.paymentMethod")}
          </span>
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="d-sm-block d-md-none stepper__mobile">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-4">
              <div className="progress-circle" data-percentage={step === 1 ? "30" : step === 2 ? "60" : "100"}>
                <span className="progress-circle-left">
                  <span className="progress-circle-bar"></span>
                </span>
                <span className="progress-circle-right">
                  <span className="progress-circle-bar"></span>
                </span>
                <div className="progress-circle-value">
                  <div>
                    <span>{step} {i18n.t("stepper.stepperOf")} 3</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="stepper__mobile--detail">
                <h2 className="stepper__mobile--detail-title">{pageTitle}</h2>
                {nextPage && <p className="stepper__mobile--detail-next">{i18n.t("stepper.stepperNext")} : {nextPage}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
