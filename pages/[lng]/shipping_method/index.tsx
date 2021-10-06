import { FC } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  ShippingMethods,
  CustomerDetail,
  PrivateRoute,
  useI18n
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Stepper from "components/Stepper/Stepper";
import { parseCookies } from "lib/parseCookies";
import { useBrand } from "lib/utils/useBrand";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import OrderSummaryBox from 'components/OrderSummaryBox/OrderSummaryBox';

const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"));

const classesCustomerDetail = {
  customerDetailBoxClass: "customer-detail__container",
  customerDetailBoxInnerClass: "customer-detail__inner",
  addressContainerClassName: "customer-detail__info",
  addressDetailClassName: "customer-detail__info--person",
  addressValueClassName: "customer-detail__info--person-value",
}

const classesShippingMethod = {
  containerClass: "container shipping-method__container",
  shippingRadioDiv: "row shipping-method__items",
  divInputClass: "col-2 col-md-1 shipping-method__items--radio",
  inputClass: "shipping-method__items--radio-input",
  inputLabel: "shipping-method__items--radio-label",
  shippingNameDivClass: "col-10 col-md-8 shipping-method__items--name",
  shippingNameClass: "shipping-method__items--name-title",
  shippingPriceDivClass: "col-10 offset-2 offset-md-0 col-md-3 shipping-method__items--price",
  shippingPriceClass: "shipping-method__items--price-title",
  warningPinPointClassName: "col-12 shipping-method__warningPinPoin",
  warningPinPointTextClassName: "shipping-method__warningPinPoinText",
  pinPointLocationClassName: "btn btn-orange-outer btn-long d-block w-100 m-3",
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
}

type PrivateComponentPropsType = {
  children: any;
};

type TypeCustomerDetailHeader = {
  title: string,
  subtitle: string
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="shipping_method"
    loadingComponent={<LoaderPages />}
  >
    {children}
  </PrivateRoute>
)

const ShippingMethodPage: FC<any> = ({
  lng,
  lngDict,
  auth,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("placeOrder.title")}`]

  const CustomerDetailHeader = ({
    title,
    subtitle
  }: TypeCustomerDetailHeader) => (
    <div className="customer-detail__header">
      <div className="customer-detail__header--left">
        <h3 className="customer-detail__header--left-title">{title}</h3>
        <p className="customer-detail__header--left-subtitle">{subtitle}</p>
      </div>
      <div className="customer-detail__header--right">
        <Link href="/[lng]/place_order" as={`/${lng}/place_order`}>
          <a className="customer-detail__header--right-link">{i18n.t("customerDetail.change")}</a>
        </Link>
      </div>
    </div>
  )

  return (
    <PrivateRouteWrapper>
      <Layout
        i18n={i18n}
        lng={lng}
        lngDict={lngDict}
        brand={brand}
      >
        <Breadcrumb
          title={i18n.t("placeOrder.title")}
          links={linksBreadcrumb}
          lng={lng}
        />
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8">
                <Stepper
                  i18n={i18n}
                  step={2}
                  pageTitle={i18n.t("pageStepper.shippingDetails")}
                  nextPage={i18n.t("pageStepper.paymentMethod")}
                />
                <hr className="d-none d-md-block my-4" />
                <div className="mobile-box">
                  <div className="customer-detail">
                    <CustomerDetail
                      isBilling={true}
                      contactInfoHeader={
                        <CustomerDetailHeader
                          title={i18n.t("shipping.contactInfo")}
                          subtitle={i18n.t("shipping.subtitleContactInfo")}
                        />
                      }
                      classes={classesCustomerDetail}
                    />
                    <hr className="my-4" />
                    <CustomerDetail
                      isBilling={false}
                      shippingInfoHeader={
                        <CustomerDetailHeader
                          title={i18n.t("shipping.shipTo")}
                          subtitle={i18n.t("shipping.subtitleShipTo")}
                        />
                      }
                      classes={classesCustomerDetail}
                    />
                  </div>
                  <div className="shipping-method">
                    <h3 className="shipping-method__title">{i18n.t("shipping.shippingMethod")}</h3>
                    <ShippingMethods
                      classes={classesShippingMethod}
                      onErrorMsg={(msg) => toast.error(msg)}
                      mapCenterIcon={<FontAwesomeIcon icon={faDotCircle} size="1x" />}
                      mapButtonCloseIcon={<FontAwesomeIcon icon={faTimes} height="1.25em" />}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 margin-step-payment no-padding-mobile-pad">
                <OrderSummaryBox
                  i18n={i18n}
                  auth={auth}
                  page="shipping_method"
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

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
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
}

export default ShippingMethodPage;
