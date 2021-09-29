import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import {
  PlaceOrderForm,
  useI18n,
  PrivateRoute,
} from "@sirclo/nexus";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Stepper from "components/Stepper/Stepper";
import { parseCookies } from "lib/parseCookies";
import { useBrand } from "lib/utils/useBrand";
import OrderSummaryBox from 'components/OrderSummaryBox/OrderSummaryBox';

const LoaderPages = dynamic(
  () => import("components/Loader/LoaderPages")
);

const classesPlaceOrderForm = {
  placeOrderClassName: "place-order",
  checkoutAsMemberClassName: "place-order__member",
  loginLabelClassName: "place-order__member--login-label",
  signupContainerClassName: "place-order__member--signup",
  signupCheckboxClassName: "place-order__member--signup-checkbox d-none",
  signupLabelClassName: "place-order__member--signup-label d-none",
  formClassName: "place-order__form",
  formGroupClassName: "sirclo-form-row",
  labelClassName: "place-order__form--label",
  inputClassName: `form-control sirclo-form-input`,
  shippingCheckboxContainerClassName: "place-order__shipping",
  shippingCheckboxTitleClassName: "d-none",
  shippingCheckboxClassName: "place-order__shipping--checkbox",
  shippingCheckboxLabelClassName: "place-order__shipping--label",
  datePickerInputClassName: "date-picker__input",
  datePickerCalendarClassName: "date-picker__calendar",
  errorMessageClassName: "place-order__errorMessage",
  mapNoteClassName: "place-order_mapNote",
  mapSelectAreaClassName: "place-order_mapChooseLocation",
  mapAreaClassName: "place-order_mapArea",
  mapPopupClassName: "place-order_mapPopup",
  mapPopupBackgroundClassName: "place-order_mapPopupContainer",
  mapClassName: "place-order_mapPopupMaps",
  mapHeaderWrapperClassName: "place-order_mapPopupHeader",
  mapHeaderTitleClassName: "place-order_mapPopupHeaderTitle",
  mapHeaderCloseButtonClassName: "place-order_mapPopupClose",
  mapHeaderNoteClassName: "place-order_mapPopupNote",
  mapLabelAddressClassName: "place-order_mapPopupLabelAddress",
  mapCenterButtonClassName: "place-order_mapPopupCenterButton",
  mapButtonFooterClassName: "btn btn-orange btn-long d-block mx-auto my-3"
};

const logistixStyles = {
  placeholder: () => ({
    padding: "0 .5rem",
    fontSize: "1rem",
    color: "rgba(0, 0, 0, 0.5)",
  }),
};

type PrivateComponentPropsType = {
  children: any;
};

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute page="place_order" loadingComponent={<LoaderPages />}>
    {children}
  </PrivateRoute>
);

const PlaceOrder: FC<any> = ({
  lng,
  lngDict,
  auth,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("placeOrder.title")}`,
  ];

  return (
    <PrivateRouteWrapper>
      <Layout
        i18n={i18n}
        lng={lng}
        lngDict={lngDict}
        brand={brand}
      >
        <Breadcrumb
          // title={i18n.t("placeOrder.title")}
          links={linksBreadcrumb}
          lng={lng}
        />
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8">
                <Stepper
                  i18n={i18n}
                  step={1}
                  pageTitle={i18n.t("pageStepper.customerInfo")}
                  nextPage={i18n.t("pageStepper.shippingDetails")}
                />
                <hr className="d-none d-md-block my-4" />
                <div className="mobile-box">
                  <PlaceOrderForm
                    onErrorMsg={(msg) => toast.error(msg)}
                    classes={classesPlaceOrderForm}
                    signupLabelPosition="bottom"
                    logistixStyles={logistixStyles}
                    mapButtonCloseIcon={<FontAwesomeIcon icon={faTimes} height="1.25em" />}
                    mapCenterIcon={<FontAwesomeIcon icon={faDotCircle} size="1x" />}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-4 margin-step-payment no-padding-mobile-pad">
                <OrderSummaryBox
                  i18n={i18n}
                  auth={auth}
                  page="place_order"
                  withOrderDetail
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </PrivateRouteWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  const cookies = parseCookies(req);
  const auth = cookies.AUTH_KEY;

  return {
    props: {
      lng: params.lng,
      lngDict,
      auth: auth || null,
      brand: brand || ''
    },
  };
};

export default PlaceOrder;
