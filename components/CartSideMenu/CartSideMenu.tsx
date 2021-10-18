import { useState } from "react";
import { OrderSummary, CartDetails, useI18n } from "@sirclo/nexus";
import { toast } from "react-toastify";
import EmptyComponent from "../../components/EmptyComponent/EmptyComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCartPlus,
  faTicketAlt,
  faCrown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  ArrowLeft,
  Info,
  X as XIcon,
} from "react-feather";
import dynamic from "next/dynamic";
import styles from "public/scss/pages/PaymentMethod.module.scss";

const Quickdetail = dynamic(() => import("../Quickdetail/Quickdetail"));
const Popup = dynamic(() => import("../Popup/PopupUno"));

const PrivateComponent = dynamic(() =>
  import("@sirclo/nexus").then((mod) => mod.PrivateComponent)
);

const classesCartDetails = {
  cartBodyClassName: "cart-side-menu",
  cartHeaderClassName: "d-none",
  itemClassName: "cart-side-menu__item",
  itemImageClassName: "cart-side-menu__item--image",
  itemTitleClassName: "cart-side-menu__item--detail",
  titleClassName: "cart-side-menu__item--detail-title",
  selectedVariantContainerClassName: "cart-side-menu__item--detail-variant",
  selectedVariantClassName: "cart-side-menu__item--detail-variant-selected",
  itemPriceClassName: "d-none",
  headerQtyClassName: "d-none",
  itemQtyClassName: "d-none",
  qtyBoxClassName: "d-none",
  itemAmountClassName: "cart-side-menu__item--price",
  itemRegularAmountClassName: "cart-side-menu__item--price--label",
  itemEditClassName: "cart-side-menu__item--edit",
  itemRemoveClassName: "cart-side-menu__item--remove",
  removeButtonClassName: "cart-side-menu__item--remove-link",
  cartFooterClassName: "cart-side-menu__footer sirclo-form-row",
  cartFooterTitleClassName: "cart-side-menu__footer--title",
  cartFooterTextareaClassName:
    "form-control sirclo-form-input cart-side-menu__footer--input",
};

const classesOrderSummary = {
  containerClassName: styles.ordersummary_container,
  headerClassName : styles.ordersummary_header,
  voucherButtonClassName : styles.ordersummary_headerRow,
  listPaymentDivClassName: "container",
  paymentItemEnabledClassName: `row ${styles.payment_listItemEnabled}`,
  paymentItemDisabledClassName: `row ${styles.payment_listItemDisabled}`,
  paymentTypeClassName: `align-self-center ${styles.payment_listItemPayment}`,
  radioButtonContainerClassName: styles.payment_listItemPayment__radio,
  paymentImgClassName: `align-self-center ${styles.payment_listItemPayment__image}`,
  paymentWarningTextClassName: styles.payment_listItemPayment__warning,
  paymentMethodDetailsClassName: `col-12 ${styles.payment_listItemBody}`,
  paymentMethodDetailBodyClassName: styles.payment_listItemDetail,
  selectedPaymentMethodClassName: styles.payment_listItemTable,
  paymentDetailsRowClassName: styles.payment_listItemTableRow,
  paymentDetailsLabelClassName: styles.payment_listItemTableRow__label,
  paymentDetailsValueClassName: styles.payment_listItemTableRow__value,
  paymentDetailsDeductionClassName: styles.payment_pointsInsufficient,
  // footer
  paymentMethodDetailFooterClassName: styles.payment_footer,
  promotionButtonGroupClassName: styles.payment_footer__promotion,
  couponButtonClassName: `btn ${styles.btn_black} ${styles.btn_long} ${styles.payment_pointButton} mb-3 px-3`,
  voucherAppliedTextClassName: styles.payment_voucherAppliedText,
  voucherButtonRemoveClassName: styles.payment_voucherAppliedRemove,
  popupClassName: styles.ordersummary_overlay,
  voucherContainerClassName: styles.payment_listItemPopup,
  closeButtonClassName: styles.payment_listItemPopup__close,
  voucherFormContainerClassName: `${styles.payment_listItemPopupForm__body} ${styles.payment_listItemPopup__payment}`,
  voucherFormClassName: `${styles.ordersummary_voucherForm} ${styles.sirclo_form_row}`,
  voucherInputClassName: `form-control ${styles.sirclo_form_input} ${styles.payment_listItemPopupForm__input}`,
  voucherSubmitButtonClassName: `btn ${styles.btn_primary} ${styles.payment_listItemPopupForm__button}`,
  voucherListClassName: styles.ordersummary_popupVoucher,
  voucherListHeaderClassName: styles.ordersummary_popupVoucherTitle,
  voucherClassName: styles.ordersummary_popupVoucherItem,
  voucherDetailClassName: styles.ordersummary_popupVoucherDetail,
  voucherDetailHeaderClassName: styles.ordersummary_popupVoucherDetailHeader,
  voucherDetailCodeClassName: styles.ordersummary_popupVoucherDetailCode,
  voucherDetailTitleClassName: styles.summarycart_popupVoucherDetailTitle,
  voucherDetailDescClassName: styles.summarycart_popupVoucherDetailDesc,
  voucherDetailEstimateClassName: styles.summarycart_popupVoucherDetailEstimate,
  voucherDetailEstimateDescClassName: styles.summarycart_popupVoucherDetailEstimateDesc,
  agreementContainerClassName: styles.payment_footer__agreement,
  agreementCheckboxClassName: styles.payment_footer__check,
  buttonContainerClassName: styles.payment_footer__button,
  buttonClassName: `btn ${styles.btn_primary} ${styles.btn_long}`,
  basePriceClassName: styles.payment_listItemTableRow__priceSale,
  salePriceClassName: styles.payment_listItemTableRow__price,
  shippingPriceClassName: styles.payment_listItemTableRow__priceSale,
  shippingDiscountClassName: styles.payment_listItemTableRow__price,
  //point
  pointsContainerClassName: styles.payment_containerPointPopup,
  numberOfPointsClassName: styles.payment_pointsPopup,
  pointsFormContainerClassName: styles.payment_pointsFormContainer,
  pointsFormClassName: styles.payment_pointsForm,
  pointsLabelClassName: styles.payment_pointsPopupLabel,
  pointsValueClassName: styles.payment_pointsPopupValue,
  changePointsClassName: styles.payment_buttonChangePoint,
  pointsInsufficientClassName: styles.payment_pointsInsufficient,
  pointsSubmitButtonClassName: `btn ${styles.btn_primary} ${styles.btn_long} w-100 mt-4 mb-0`,
  pointsWarningClassName: styles.payment_pointsWarning,
  pointButtonClassName: `btn ${styles.btn_black} ${styles.btn_long} ${styles.payment_pointButton} mb-3 px-3`,
  pointAppliedTextClassName: styles.payment_pointAppliedText,
  pointButtonRemoveClassName: styles.payment_pointAppliedRemove,
  voucherIconClassName: styles.ordersummary_headerIcon,
  voucherTextClassName: styles.ordersummary_headerLabel,
  voucherButtonAppliedClassName: styles.ordersummary_voucherAppliedButton,
  voucherAppliedIconClassName: styles.ordersummary_voucherAppliedIcon,
  pointsButtonClassName: "col-6 order-summary-side-menu__header--features",
  pointsIconClassName: "d-none",
  pointsTextClassName: "order-summary-side-menu__header--features-label",
  subTotalClassName: "row order-summary-side-menu__body",
  subTotalTextClassName:
    "col-6 px-0 order-summary-side-menu__body--label-subtotal",
  subTotalPriceClassName: "col-6 px-0 order-summary-side-menu__body--subtotal",
  footerClassName: "row order-summary-side-menu__footer",
  submitButtonClassName: "col-12 order-1 px-0 btn btn-orange btn-long my-1",
  continueShoppingClassName:
    "col-12 order-2 px-0 btn btn-orange-outer btn-long my-1",
  //Popup
  labelClassName: "order-summary-side-menu__popup--points-label",
  valueClassName: "order-summary-side-menu__popup--points-value",
  voucherFooterClassName: "order-summary-side-menu__popup--voucher-footer",
  voucherApplyButtonClassName: "btn btn-orange",
  
};

const classesEmptyComponent = {
  emptyContainer: "cart-side-menu__empty",
  emptyTitle: "cart-side-menu__empty--title",
  emptyDesc: "cart-side-menu__empty--desc",
};

const classesOrderSum = (auth) => {
  let classes = classesOrderSummary;
  // classes.voucherButtonClassName = `${auth ? "col-6" : "col-12"
  //   } order-summary-side-menu__header--features`;
  return classes;
};

type OrderSummaryComponentType = {
  withAuth?: boolean;
  i18n: any;
  setShowModalErrorAddToCart: any;
};

const OrderSummaryComponent = ({
  withAuth,
  i18n,
  setShowModalErrorAddToCart
}: OrderSummaryComponentType) => (
  <OrderSummary
    classes={withAuth ? classesOrderSum(true) : classesOrderSum(false)}
    currency="IDR"
    submitButtonLabel={i18n.t("orderSummary.placeOrder")}
    continueShoppingLabel={i18n.t("orderSummary.viewCart")}
    page={"cart"}
    continueShoppingRoute="cart"
    onErrorMsg={() => setShowModalErrorAddToCart(true)}
    icons={{
      voucher: <img src="/images/mdi_ticket-percent.svg" alt="icon" /> ,
      points: <FontAwesomeIcon icon={faCrown} height="1em" />,
      close: <XIcon />,
    }}
  />
);

const CartSideMenu = () => {
  const i18n: any = useI18n();
  const [slug, setSlug] = useState<string>("");

  const [isQuickDetail, setIsQuickDetail] = useState<boolean>(false);
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);

  const slugQuickDetail = (slug: string) => {
    setSlug(slug);
    setIsQuickDetail(true);
  };

  return (
    <>
      {slug && isQuickDetail && (
        <Quickdetail
          slug={slug}
          setSlug={setSlug}
          setIsQuickDetail={setIsQuickDetail}
        />
      )}
      {showModalErrorAddToCart &&
        <Popup withHeader setPopup={setShowModalErrorAddToCart}>
          <div className="cart-side-menu_errorAddCart">
            <h3 className="cart-side-menu_errorAddCartTitle">{i18n.t("cart.errorSKUTitle")}</h3>
            <p className="cart-side-menu_errorAddCartDesc">{i18n.t("cart.errorSKUDetail")} </p>
          </div>
        </Popup>
      }
      <div className="cart-side-menu">
        <CartDetails
          withSeparatedVariant={true}
          classes={{
            ...classesCartDetails,
            itemRemoveClassName: `cart-side-menu__item--remove ${slug ? "" : "p-0"
              }`,
          }}
          itemRedirectPathPrefix={`product`}
          isEditable={slug ? true : false}
          getSelectedItemSlug={(slug: string) => {
            slugQuickDetail(slug);
          }}
          onErrorMsg={(msg) => toast.error(msg)}
          editIcon={<FontAwesomeIcon icon={faEdit} height="1em" />}
          removeIcon={<FontAwesomeIcon icon={faTrash} color="#fff" height="1em" />}
          emptyCartPlaceHolder={
            <EmptyComponent
              classes={classesEmptyComponent}
              logo={
                <FontAwesomeIcon
                  icon={faCartPlus}
                  className="cart-side-menu__empty--icon"
                />
              }
              title={i18n.t("cart.isEmpty")}
              desc={i18n.t("cart.isEmptyDesc")}
            />
          }
        />
        <PrivateComponent
          Auth={
            <OrderSummaryComponent
              withAuth
              i18n={i18n}
              setShowModalErrorAddToCart={setShowModalErrorAddToCart}
            />
          }
          NoAuth={
            <OrderSummaryComponent
              i18n={i18n}
              setShowModalErrorAddToCart={setShowModalErrorAddToCart}
            />
          }
        />
      </div>
    </>
  );
};

export default CartSideMenu;
