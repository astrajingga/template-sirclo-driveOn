import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Account, useI18n } from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { parseCookies } from "lib/parseCookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCheckCircle,
  faDotCircle,
  faEye,
  faEyeSlash,
  faList,
  faLock,
  faTimes,
  faUserAlt,
  faCoins,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faLine
} from "@fortawesome/free-brands-svg-icons";
import{
  AlertCircle 
} from "react-feather"
import { toast } from "react-toastify";
import { useBrand } from "lib/utils/useBrand";
import { useWhatsAppOTPSetting } from "lib/utils/useSingleSignOn";

import stylesPopupCheckPaymentOrder from "public/scss/components/CheckPaymentOrder.module.scss";
import styles from "public/scss/pages/Account.module.scss";

const ACTIVE_CURRENCY = "IDR";

const classesAccount = {
  myAccountSeparatorClassName : "account-separator",
  containerClassName: "account-page_detail",
  tabClassName: "account-page_detail-tab",
  tabItemClassName: "account-page_detail-tab-item",
  linkTabItemClassName: "account-page_detail-tab-item-link",
  linkTabItemActiveClassName: "account-page_detail-tab-item-link--active",
  tabItemIconClassName: "tab-item-icon",
  tabPaneClassName: "account-page_detail-tab-pane",
  myAccountClassName: "tab-pane-container",
  myAccountContentClassName: "tab-pane-account",
  myAccountBodyClassName: "account-order-list",
  myAccountFieldClassName: "account-list d-md-flex align-items-center",
  myAccountLabelClassName: "account-list-label d-md-flex",
  myAccountValueClassName: "account-list-value d-md-flex",
  loyaltyPointContainerClassName: "d-none",

  editAccountClassName: "edit-account",
  inputContainerClassName: `${styles.sirclo_form_row} d-md-flex align-items-center`,
  inputLabelClassName: styles.account_edit__label,
  inputClassName: "form-control sirclo-form-input size-label",
  changePasswordClassName: styles.account_changePassword,
  passwordContainerClassName: `d-flex align-items-center position-relative w-100`,
  passwordInputClassName: `form-control ${styles.sirclo_form_input}`,
  passwordStrengthBarClassName: styles.passwordBar,
  passwordStrengthBarContainerClassName: `${styles.passwordValidation} ${styles.marginAccount}`,
  passwordCriteriaListClassName: `${styles.formPassword} ${styles.marginAccount} ${styles.formPasswordAccount} d-none`,
  passwordCriteriaClassName: styles.formPasswordList,
  buttonClassName: `btn text-uppercase mr-2 ${styles.btn_primary} ${styles.btn_long}`,

  tableClassName: "table",
  orderHistoryContainerClassName: "order-history-container",
  orderItemClassName: "order-history-items",
  orderHeaderClassName: "order-history-items__header",
  orderInnerHeaderClassName: "order-history-items__header-inner",
  orderTitleClassName: "order-history-items__title",
  orderDateClassName: "order-history-items__date",
  orderBodyClassName: "order-history-items-body",
  invoiceButtonClassName: "order-history-items-body invoice-button",
  datePickerInputClassName: "date-picker__input",
  datePickerCalendarClassName: "date-picker__calendar",

  /* payment statuses */
  paymentStatusPaidClassName: "order-history-items__paymentStatus",
  paymentStatusUnpaidClassName: "order-history-items__paymentStatus",
  paymentStatusConfirmingClassName: "order-history-items__paymentStatus",
  paymentStatusReadyToShipClassName: "order-history-items__paymentStatus",
  paymentStatusShippedClassName: "order-history-items__paymentStatus",
  paymentStatusDeliveredClassName: "order-history-items__paymentStatus",
  paymentStatusCompletedClassName: "order-history-items__paymentStatus",
  paymentStatusCancelledClassName: "order-history-items__paymentStatus",

  orderedItemsContainer: "ordered-container",
  orderedItemsLabelClassName: "label",
  orderedItemsClassName: "ordered-items",
  orderedItemImageClassName: "d-none",
  orderedItemDetailPriceClassName: "d-none",
  orderedItemDetailTitleClassName: "ordered-itemTitle",
  orderedItemDetailClassName: "ordered-itemDetail",
  orderedItemDetailNeedReviewClassName: "ordered-button ordered-button-needReview btn",
  orderedItemDetailReviewedClassName: "ordered-button ordered-button-reviewed btn",
  buyerNoteLabelClassName: "label",
  shippingContainerClassName: "order-history-shipping-container",
  shippingDetailsClassName: "order-history-shipping-details",
  shippingDetailsLabelClassName: "label",
  shippingMethodContainerClassName: "order-history-shipping-method",
  shippingMethodLabelClassName: "label",
  paymentMethodContainerClassName: "order-history-payment-container",
  paymentMethodLabelClassName: "label",
  orderFooterClassName: "order-history-footer",
  totalCostClassName: "order-history-footer__total-cost",

  /* tracker */
  shipmentTrackingClassName: "order-history-shipmentTracking__background",
  shipmentHeaderClassName: "order-history-shipmentTracking__header",
  shipmentBodyClassName: "order-history-shipmentTracking__body",
  shipmentFooterClassName: "order-history-shipmentTracking__footer",
  shippingTrackerButton: "order-history-shipmentTracking__toggle",
  shipmentHeaderTextClassName: "track-shipment__headerText",
  shipmentTextClassName: "track-shipment__text",
  shipmentListClassName: "track-shipment__list",
  shipmentListWrapperClassName: "track-shipment__listWrapper",
  shipmentCloseIconClassName: "track-shipment__closeIcon",
  shipmentTrackButtonClassName: "track-shipment__trackButton btn btn-orange",
  shipmentNoteClassName: "track-shipment__note",

  /* map */
  mapAreaClassName: "account-page_mapArea",
  mapSelectAreaClassName: "account-page_buttonLocation",
  mapPopupClassName: "account-page_mapPopup",
  mapPopupBackgroundClassName: "account-page_mapPopupContainer",
  mapClassName: "account-page_mapPopupMaps",
  mapHeaderWrapperClassName: "account-page_mapPopupHeader",
  mapHeaderTitleClassName: "account-page_mapPopupHeaderTitle",
  mapHeaderCloseButtonClassName: "account-page_mapPopupClose",
  mapHeaderNoteClassName: "account-page_mapPopupNote",
  mapLabelAddressClassName: "account-page_mapPopupLabelAddress",
  mapCenterButtonClassName: "account-page_mapPopupCenterButton",
  mapButtonFooterClassName: "btn btn-orange btn-long d-block mx-auto my-3 mx-2",

  /* membership */
  membershipStatusClassName: "account-page_membershipStatus",
  accordionClassName: "account-page_membershipAccordion",
  accordionToggleClassName: "account-page_membershipAccordionToggle",
  accordionIconClassName: "account-page_membershipAccordionIcon",
  totalPointsClassName: "account-page_membershipTotalPoints",
  membershipProgressClassName: "account-page_membershipProgress",
  membershipPromptClassName: "account-page_membershipPrompt",
  membershipHistoryClassName: "account-page_membershipHistory",
  pointHistoryItemClassName: "account-page_membershipHistoryItem",
  orderIDClassName: "account-page_membershipHistoryOrderID",
  linkContinueClassName: "account-page_membershipHistoryLinkContinue",
  transactionDateClassName: "account-page_membershipHistoryTransactionDate",
  transactionTypeClassName: "account-page_membershipHistorytransactionType",
  pointDeltaClassName: "account-page_membershipHistoryPointDelta",
  membershipPaginationClassName: "account-page_membershipHistoryPagination",
  itemPerPageClassName: "account-page_membershipHistoryItemPerPage",
  itemPerPageLabelClassName: "account-page_membershipHistoryItemPerPageLabel",
  itemPerPageOptionsClassName: "account-page_membershipHistoryItemPerPageOptions",

  /* order confirmation */
  popupConfirmationOrderContainerClassName: "orderConfirmPopup__container",
  popupConfirmationOrderContentClassName: "orderConfirmPopup__content",
  popupConfirmationOrderTitleClassName: "orderConfirmPopup__title",
  popupConfirmationOrderNoteClassName: "orderConfirmPopup__note",
  popupConfirmationOrderDescriptionClassName: "orderConfirmPopup__description",
  popupConfirmationOrderWrapButtonClassName: "orderConfirmPopup__buttons",
  popupConfirmationOrderButtonConfirmClassName: "orderConfirmPopup__button orderConfirmPopup__button--confirm btn btn-orange-outer",
  popupConfirmationOrderButtonNoClassName: "orderConfirmPopup__button orderConfirmPopup__button--cancel btn btn-orange",
  orderControlClassName: "order-history__actions",
  orderedItemDetailDeliveredClassName: "order-history-items-body invoice-button",

  /* setting notification */
  settingNotifContainer: "notification",
  settingNotifHeader: "d-none",
  settingNotifDescription: "notification_desc",
  settingNotifMedia: "notification_media",
  mediaParent: "notification_mediaParent",
  mediaLabelContainer: "notification_mediaLabel",
  mediaInnerLabelContainer: "notification_mediaInnerLabel",
  mediaDescription: "notification_mediaDesc",
  mediaCheckboxContainer: "notification_mediaCheckboxContainer",
  mediaCheckbox: "notification_mediaCheckbox",
  mediaCheckboxSlider: "notification_mediaCheckboxSlider",
  mediaDetailContainer: "notification_mediaDetailContainer",
  mediaDetailLabel: "notification_mediaDetailLabel",
  mediaDetailCheckboxContainer: "notification_mediaDetailCheckboxContainer",
  mediaDetailCheckbox: "notification_mediaDetailCheckbox",
  mediaDetailCheckboxLabel: "notification_mediaDetailCheckboxLabel",

  checkPaymentOrderContainerClassName: stylesPopupCheckPaymentOrder.checkOrder_overlay,
  checkPaymentOrderContainerBodyClassName: stylesPopupCheckPaymentOrder.checkOrder_container,
  checkPaymentOrderHeaderClassName: stylesPopupCheckPaymentOrder.checkOrder_header,
  checkPaymentOrderTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_title,
  checkPaymentOrderDescriptionClassName: stylesPopupCheckPaymentOrder.checkOrder_description,
  checkPaymentOrderContentClassName: stylesPopupCheckPaymentOrder.checkOrder_content,
  checkPaymentOrderInputContentClassName: stylesPopupCheckPaymentOrder.checkOrder_inputContent,
  checkPaymentOrderInputTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_inputTitle,
  checkPaymentOrderInputClassName: stylesPopupCheckPaymentOrder.checkOrder_input,
  checkPaymentOrderCloseButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_closeButton,
  checkPaymentOrderSubmitButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_submitButton,

  orderInfoContainerClassName: styles.membership_info_container,
  OrderInfoIconClassName: styles.membership_info_icon,
  orderInfoLabelClassName: styles.membership_info_label,
  OrderInfoSearchHereClassName: styles.membership_info_button,
};

const paginationClasses = {
  pagingClassName: "order-history-footer__pagination-order",
  itemClassName: "order-history-footer__pagination-order-list",
  activeClassName: "active",
  linkClassName: "order-history-footer__pagination-order-list-link",
};

const Accounts: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasOtp
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  const [name, setName] = useState<string>("");

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("account.title")}`,
  ];

  const onError = (msg: string) => toast.error(msg);
  const onSuccessChPass = (msg: string) => toast.success(msg);

  const onSuccess = (msg: string, data: any) => {
    if (data) setName(data.upsertProfile[0]?.firstName + " " + data?.upsertProfile[0]?.lastName);
    toast.success(msg);
  };


  const onFetchCompleted = (_: string, data: any) => {
    const { firstName, lastName } = data?.members[0];
    setName(`${firstName} ${lastName}`);
  };

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb
        title={i18n.t("account.yourAccount")}
        links={linksBreadcrumb}
        lng={lng}
      />
      <div className="container">
        <div className="account-page-container">
          <div className="account-page-inner">
            <div className="account-page_profile">
              <h2 className="account-page_profile--title">
                {i18n.t("account.hi")}
                {", "}
                <span>{name || "Guys"}</span>
              </h2>
            </div>
            <Account
              classes={classesAccount}
              onErrorMsg={onError}
              onSuccessMsg={onSuccess}
              onSuccessChPass={onSuccessChPass}
              onFetchCompleted={onFetchCompleted}
              currency={ACTIVE_CURRENCY}
              orderHistoryType="list"
              paymentHrefPrefix="payment_notif"
              showSettingNotification={hasOtp}
              orderHistoryIsCallPagination={true}
              orderHistoryItemPerPage={10}
              orderHistoryPaginationClasses={paginationClasses}
              membershipPaginationClasses={paginationClasses}
              passwordUnfulfilledCriteriaIcon={<FontAwesomeIcon icon={faCheckCircle} height="1.25em" />}
              passwordFulfilledCriteriaIcon={<FontAwesomeIcon icon={faCheckCircle} height="1.25em" />}
              passwordViewIcon={<FontAwesomeIcon icon={faEye} className="icon-password" />}
              passwordHideIcon={<FontAwesomeIcon icon={faEyeSlash} className="icon-password" />}
              mapButtonCloseIcon={<FontAwesomeIcon icon={faTimes} height="1.25em" />}
              mapCenterIcon={<FontAwesomeIcon icon={faDotCircle} size="1x" />}
              icons={{
                infoIcon : <AlertCircle/>,
                myAccount: <FontAwesomeIcon icon={faUserAlt} height="1em" />,
                changePassword: <FontAwesomeIcon icon={faLock} height="1em" />,
                orderHistory: <FontAwesomeIcon icon={faList} height="1em" />,
                accordionIcon: <FontAwesomeIcon icon={faChevronDown} height="1em" color="#F7BE16" />,
                membershipHistory: <FontAwesomeIcon icon={faCoins} height="1em" />,
                settingNotification: <FontAwesomeIcon icon={faBell} height="1em" />,
                email: <FontAwesomeIcon icon={faEnvelope} size="2x" />,
                whatsApp: <FontAwesomeIcon icon={faWhatsapp} size="2x" />,
                line: <FontAwesomeIcon icon={faLine} size="2x" />,
                closeIcon: <FontAwesomeIcon icon={faTimes} height="1em" />,
                iconTracker: <img className="mr-2" src={"/images/order_track.svg"} alt="order_track" />
              }}
              thumborSetting={{
                width: 1,
                format: 'webp',
                quality: 5,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  if (res) {
    const cookies = parseCookies(req);
    const auth = cookies.AUTH_KEY;

    if (!auth) {
      res.writeHead(307, {
        Location: `/${cookies.ACTIVE_LNG || "id"}/login`,
      });
      res.end();
    }
  }

  const brand = await useBrand(req);
  const hasOtp = await useWhatsAppOTPSetting(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
      hasOtp
    },
  };
};

export default Accounts;