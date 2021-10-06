import { FC, useState } from "react";
import {
  OrderSummary,
  CartDetails
} from "@sirclo/nexus";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import {
  faTimes,
  faChevronDown,
  faChevronUp,
  faTicketAlt,
  faCrown
} from "@fortawesome/free-solid-svg-icons";

const Popup = dynamic(
  () => import("components/Popup/Popup")
);

const classesOrderSummary = {
  containerClassName: "order-summary",
  headerClassName: "order-summary__header",
  voucherButtonClassName: "order-summary__header--features",

  voucherIconClassName: "order-summary__header--features-icon",
  voucherTextClassName: "order-summary__header--features-label",
  subTotalClassName: "order-summary__body",
  subTotalTextClassName: "order-summary__body--label-subtotal",
  subTotalPriceClassName: "order-summary__body--subtotal",
  footerClassName: "order-summary__footer",
  submitButtonClassName: "px-0 btn btn-orange btn-long btn-45-pad order-summary__submitButton",
  continueShoppingClassName: "d-none",
  popupClassName: "order-summary__overlay",
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

  pointsButtonClassName: "order-summary__header--features b-left mt-3",
  pointsIconClassName: "order-summary__header--features-icon",
  pointsTextClassName: "order-summary__header--features-label",
  pointsAppliedTextClassName: "order-summary_voucherAppliedText",
  pointsButtonAppliedClassName: "col-6 order-summary_voucherButtonApplied b-left",

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

  voucherDetailClassName: "order-summary__popup--voucher-detail",
  voucherButtonAppliedClassName: "col-12 order-summary_voucherButtonApplied b-right",
  voucherButtonRemoveClassName: "cursor-pointer order-summary_voucherButtonRemove",
  voucherAppliedTextClassName: "order-summary_voucherAppliedText",
  expandButtonClassName: "order-summary_expandButton",
  expandedDivClassName: "order-summary_expandedDiv",
  expandedPriceClassName: "order-summary_expandedPrice",
};

const classesCartDetails = {
  className: "cartOrderSummaryBox_body",
  cartHeaderClassName: "d-none",
  itemClassName: "cartItem",
  itemImageClassName: "cartItem_image",
  itemTitleClassName: "cartItem_detail",
  itemPriceClassName: "cartItem_priceCalculate",
  itemRegularPriceClassName: "cartItem_priceRegular",
  itemSalePriceClassName: "cartItem_priceSale",
  itemSalePriceWrapperClassName: "cartItem_priceSaleWrapper",
  itemDiscountNoteClassName: "cartItem_discNote",
  itemRegularAmountClassName: "d-none",
  headerQtyClassName: "d-none",
  titleClassName: "cartItem_title",
  itemQtyClassName: "cartItem_qty",
  qtyBoxClassName: "cartItem_qtyBox",
  itemAmountClassName: "cartItem_price",
  itemEditClassName: "d-none",
  itemRemoveClassName: "d-none",
  cartFooterClassName: "cartFooter",
  cartFooterTitleClassName: "d-none",
  cartFooterTextareaClassName: "d-none",
  changeQtyButtonClassName: "d-none",
  cartBodyClassName: "cartOrderSummaryBox_body"
}

const OrderSummaryBox: FC<any> = ({
  i18n,
  auth,
  page,
  withOrderDetail
}) => {
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);

  const classesOrderSum = () => {
    let classes = classesOrderSummary;
    classes.voucherButtonClassName = `${auth ? "col-12 b-right" : "col-12"
      } order-summary__header--features`;
    classes.voucherButtonAppliedClassName = `${auth ? "col-6 b-right" : "col-12"
      } order-summary_voucherButtonApplied`;
    return classes;
  };

  return (
    <>
      <div className="order-summary__wrapper">
        {withOrderDetail &&
          <div className="cartOrderSummaryBox order-1">
            <div className="flex cart_orderSummaryBoxTitle">
              <p className="cartOrderSummaryBox_title">{i18n.t("orderSummary.orderSummary")}</p>
            </div>
            <CartDetails
              withSeparatedVariant={true}
              classes={classesCartDetails}
              itemRedirectPathPrefix={`product`}
              isEditable={true}
              removeIcon={<FontAwesomeIcon icon={faTimes} height="1.25em" />}
              onErrorMsg={(msg) => toast.error(msg)}
            />
          </div>
        }
        <OrderSummary
          classes={classesOrderSum()}
          currency="IDR"
          submitButtonLabel={i18n.t("orderSummary.placeOrder")}
          continueShoppingLabel={i18n.t("orderSummary.continueShopping")}
          page={page}
          continueShoppingRoute="products"
          onAddressInvalid={(e) => toast.error(e)}
          onErrorMsg={() => setShowModalErrorAddToCart(!showModalErrorAddToCart)}
          onErrorMsgCoupon={(msg) => toast.error(msg)}
          isAccordion
          icons={{
            voucher: <FontAwesomeIcon icon={faTicketAlt} height="1em" />,
            points: <FontAwesomeIcon icon={faCrown} height="1em" />,
            pointsApplied: <h3 className="order-summary__popup--points-textApllied">{i18n.t("orderSummary.points")}</h3>,
            voucherApplied: <h3 className="order-summary__popup--voucher-textApllied">{i18n.t("orderSummary.voucher")}</h3>,
            close: <FontAwesomeIcon icon={faTimes} height="1em" />,
            expand: <FontAwesomeIcon icon={faChevronUp} color="#F7BE16" className="order-summary_expandButtonIcon" />,
            collapse: <FontAwesomeIcon icon={faChevronDown} color="#F7BE16" className="order-summary_expandButtonIcon" />,
            voucherRemoved: <FontAwesomeIcon icon={faTimes} />
          }}
        />
      </div>

      {showModalErrorAddToCart &&
        <Popup setPopup={setShowModalErrorAddToCart}>
          <div className="cart_errorAddCart">
            <h3 className="cart_errorAddCartTitle">{i18n.t("cart.errorSKUTitle")}</h3>
            <p className="cart_errorAddCartDesc">{i18n.t("cart.errorSKUDetail")} </p>
          </div>
        </Popup>
      }
    </>
  )
}

export default OrderSummaryBox
