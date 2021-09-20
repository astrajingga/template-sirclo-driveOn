import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import {
  CustomerDetail,
  ListPaymentMethod,
  PrivateRoute,
  useI18n,
  useShippingMethod,
} from "@sirclo/nexus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCreditCard,
  faTicketAlt,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Layout from "components/Layout/Layout";
import Stepper from "components/Stepper/Stepper";
import Loader from "components/Loader/Loader";
import EmptyComponent from "components/EmptyComponent/EmptyComponent";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useBrand } from "lib/utils/useBrand";
import { useWhatsAppOTPSetting } from "lib/utils/useSingleSignOn";


const LoaderPages = dynamic(
  () => import("components/Loader/LoaderPages")
);

const classesCustomerDetail = {
  customerDetailBoxClass: "customer-detail__container",
  customerDetailBoxInnerClass: "customer-detail__inner",
  addressContainerClassName: "customer-detail__info",
  addressDetailClassName: "customer-detail__info--person",
  addressValueClassName: "customer-detail__info--person-value",
};

const classesListPaymentMethod = {
  listPaymentDivClassName: "container payment-method__container",
  paymentItemEnabledClassName: "row payment-method__items",
  paymentItemDisabledClassName: "row payment-method__items payment-method__itemsDisabled",
  paymentTypeClassName:
    "col-12 col-md-7 align-self-center payment-method__items--payment",
  radioButtonContainerClassName: "payment-method__items--payment-radio",
  paymentWarningTextClassName: "payment-method__items--payment-warning",
  paymentImgClassName:
    "col-12 col-md-5 align-self-center payment-method__items--payment-image",
  paymentMethodDetailsClassName:
    "col-12 payment-method__items--payment-details",
  paymentMethodDetailBodyClassName:
    "payment-method__items--payment-details-body",
  selectedPaymentMethodClassName:
    "payment-method__items--payment-details-table",
  paymentSummaryClassName: "payment-method__items--payment-details-table-body",
  paymentDetailsRowClassName:
    "payment-method__items--payment-details-table-row",
  paymentDetailsLabelClassName:
    "payment-method__items--payment-details-table-row-label",
  paymentDetailsValueClassName:
    "payment-method__items--payment-details-table-row-value",
  // footer
  paymentMethodDetailFooterClassName: "payment-method__items--payment-footer",
  promotionButtonGroupClassName:
    "payment-method__items--payment-footer-promotion",
  couponButtonClassName: "btn btn-orange-outer btn-promotion btn-long px-3",
  popupClassName: "payment-method__items--overlay",
  voucherContainerClassName: "order-summary__popup",
  closeButtonClassName: "order-summary__popup-close",
  voucherFormContainerClassName: "order-summary__popup-form-container",
  voucherFormClassName: "form-inline sirclo-form-row order-summary__popup-form",
  voucherInputClassName: "form-control sirclo-form-input order-summary__popup-form-input",
  voucherSubmitButtonClassName: "btn btn-black-outer order-summary__popup-form-button",
  voucherListClassName: "order-summary__popup--voucher",
  voucherListHeaderClassName: "order-summary__popup--voucher-title",
  voucherClassName: "order-summary__popup--voucher-list",
  voucherFooterClassName: "order-summary__popup--voucher-footer",
  voucherApplyButtonClassName: "btn btn-orange",
  voucherDetailClassName: "order-summary__popup--voucher-detail",
  agreementContainerClassName:
    "payment-method__items--payment-footer-agreement",
  agreementCheckboxClassName:
    "payment-method__items--payment-footer-agreement-check",
  agreementLabelClassName:
    "payment-method__items--payment-footer-agreement-label",
  buttonContainerClassName: "payment-method__items--payment-footer-button",
  buttonClassName: "btn btn-orange btn-long",
  basePriceClassName: "products__item--content-price--sale",
  shippingPriceClassName: "payment-method_shippingPrice",
  shippingDiscountClassName: "payment-method_shippingDiscount",

  pointButtonClassName: "payment-method__items--payment-footer-point_toggle px-3",
  pointsContainerClassName: "order-summary__popup",
  numberOfPointsClassName: "order-summary__popup--points-header",
  pointsFormClassName: "order-summary__popup--points-form",
  changePointsClassName: "order-summary__popup--points-change",
  pointLabelClassName: "order-summary__popup--points-label",
  totalPointsClassName: "order-summary__popup--points-total",
  valueClassName: "order-summary__popup--points-value",
  pointsInsufficientClassName: "order-summary__popup--points-insufficient",
  pointsSubmitButtonClassName: "order-summary__popup--points-submit",
  pointsWarningClassName: "order-summary__popup--points-warning",
  pointButtonRemoveClassName: "d-flex align-items-center ml-auto",
  voucherButtonRemoveClassName: "d-flex align-items-center ml-auto",
  voucherAppliedTextClassName: "order-summary_voucherAppliedText",
  pointAppliedTextClassName: "order-summary_voucherAppliedText",

  /* OPT WA */
  popupContainerClassName: "popupOpt_popupContainer",
  popupBackgroundClassName: "popupOpt_popupBackground",
  optInContainer: "popupOpt_optInContainer",
  optInTitle: "popupOpt_optInTitle",
  optInDescription: "popupOpt_optInDescription",
  optInInputContainer: "popupOpt_optInInputContainer",
  optInInputPrefixContainer: "popupOpt_optInInputPrefixContainer",
  optInInputPrefix: "popupOpt_optInInputPrefix",
  optInOptions: "popupOpt_optInOptions",
  optInOption: "popupOpt_optInOption",
  optInInputNumber: "popupOpt_optInInputNumber",
  optInCheckboxContainer: "popupOpt_optInCheckboxContainer",
  optInCheckbox: "popupOpt_optInCheckbox",
  optInBtn: "popupOpt_optInBtn",
  popupOverlay: "popupOpt_popupOverlay"
};

const classesEmptyComponent = {
  emptyContainer: "payment-method__empty",
  emptyTitle: "payment-method__empty--title",
  emptyDesc: "payment-method__empty--desc",
};

type PrivateComponentPropsType = {
  children: any;
};

type TypeCustomerDetailHeader = {
  title: string,
  subtitle: string,
  linkTo: string
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute page="payment_method" loadingComponent={<LoaderPages />}>
    {children}
  </PrivateRoute>
);

const PaymentMethods: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasOtp
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const { data } = useShippingMethod();

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("placeOrder.title")}`,
  ];

  const CustomerDetailHeader = ({
    title,
    subtitle,
    linkTo
  }: TypeCustomerDetailHeader) => (
    <div className="customer-detail__header">
      <div className="customer-detail__header--left">
        <h3 className="customer-detail__header--left-title">{title}</h3>
        <p className="customer-detail__header--left-subtitle">{subtitle}</p>
      </div>
      <div className="customer-detail__header--right">
        <Link href={`/[lng]/${linkTo}`} as={`/${lng}/${linkTo}`}>
          <a className="customer-detail__header--right-link">
            {i18n.t("customerDetail.change")}
          </a>
        </Link>
      </div>
    </div>
  );

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
              <div className="col-12">
                <Stepper
                  i18n={i18n}
                  step={3}
                  pageTitle={i18n.t("pageStepper.paymentMethod")}
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
                          linkTo={"place_order"}
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
                          linkTo={"place_order"}
                        />
                      }
                      classes={classesCustomerDetail}
                    />
                    <hr className="my-4" />
                    {data?.shippingMethod && (
                      <div className="customer-detail__container">
                        <div className="customer-detail__info">
                          <CustomerDetailHeader
                            title={i18n.t("shipping.shippingMethod")}
                            subtitle={i18n.t("shipping.subtitleShipTo")}
                            linkTo={"shipping_method"}
                          />
                          <div className="row shipping-detail__provider">
                            <div className="col-12 col-md-3">
                              <h3 className="shipping-detail__provider--title">
                                {data?.shippingMethod.shippingProvider}&nbsp;
                                {data?.shippingMethod.shippingService}
                              </h3>
                            </div>
                            <div className="col-12 col-md-3">
                              <h3 className="shipping-detail__provider--title">
                                {data?.shippingMethod.shippingCost}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="payment-method">
                    <h3 className="payment-method__title">
                      {i18n.t("shipping.paymentMethod")}
                    </h3>
                    <ListPaymentMethod
                      withNotificationOptInModal={hasOtp}
                      classes={classesListPaymentMethod}
                      onErrorMsg={(msg) => toast.error(msg)}
                      removeVoucherIcon={<FontAwesomeIcon icon={faTimes} />}
                      removePointIcon={<FontAwesomeIcon icon={faTimes} />}
                      voucherIcon={<FontAwesomeIcon icon={faTicketAlt} height="1em" />}
                      pointIcon={<FontAwesomeIcon icon={faCrown} height="1em" />}
                      voucherAppliedIcon={<h3 className="order-summary__popup--voucher-textApllied">{i18n.t("orderSummary.voucher")}</h3>}
                      pointAppliedIcon={<h3 className="order-summary__popup--points-textApllied">{i18n.t("orderSummary.points")}</h3>}
                      popupLoader={
                        <div className="modal-payment__overlay">
                          <div className="modal-payment__container">
                            <div className="modal-payment__inner">
                              <span
                                className="spinner-border spinner-border-sm mr-3"
                                role="status"
                              ></span>
                              <span>{i18n.t("payment.prepayment")}</span>
                            </div>
                          </div>
                        </div>
                      }
                      loaderElement={
                        <div className="mx-auto loader">
                          <Loader color="text-dark" />
                        </div>
                      }
                      emptyState={
                        <EmptyComponent
                          classes={classesEmptyComponent}
                          logo={
                            <FontAwesomeIcon
                              icon={faCreditCard}
                              className="cart-table__empty--icon"
                            />
                          }
                          title={i18n.t("payment.isEmpty")}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req);
  const hasOtp = await useWhatsAppOTPSetting(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
      hasOtp
    },
  }
}

export default PaymentMethods;