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
import dynamic from "next/dynamic";

const Quickdetail = dynamic(() => import("../Quickdetail/Quickdetail"));
const Popup = dynamic(() => import("../Popup/Popup"));

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
  itemEditClassName: "cart-side-menu__item--edit",
  itemRemoveClassName: "cart-side-menu__item--remove",
  removeButtonClassName: "cart-side-menu__item--remove-link",
  cartFooterClassName: "cart-side-menu__footer sirclo-form-row",
  cartFooterTitleClassName: "cart-side-menu__footer--title",
  cartFooterTextareaClassName:
    "form-control sirclo-form-input cart-side-menu__footer--input",
};

const classesOrderSummary = {
  containerClassName: "order-summary-side-menu",
  headerClassName: "row order-summary-side-menu__header",
  voucherButtonClassName: "col-6 order-summary-side-menu__header--features",
  voucherIconClassName: "d-none",
  voucherTextClassName: "order-summary-side-menu__header--features-label",
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
  popupClassName: "order-summary-side-menu__overlay",
  voucherContainerClassName: "order-summary-side-menu__popup",
  numberOfPointsClassName: "order-summary-side-menu__popup--points",
  labelClassName: "order-summary-side-menu__popup--points-label",
  valueClassName: "order-summary-side-menu__popup--points-value",
  closeButtonClassName: "order-summary-side-menu__popup-close",
  voucherFormContainerClassName:
    "order-summary-side-menu__popup-form-container",
  voucherFormClassName:
    "form-inline sirclo-form-row order-summary-side-menu__popup-form",
  voucherInputClassName:
    "form-control sirclo-form-input order-summary-side-menu__popup-form-input",
  voucherSubmitButtonClassName:
    "btn btn-black-outer order-summary-side-menu__popup-form-button",
  voucherListClassName: "order-summary-side-menu__popup--voucher",
  voucherListHeaderClassName: "order-summary-side-menu__popup--voucher-title",
  voucherClassName: "order-summary-side-menu__popup--voucher-list",
  voucherFooterClassName: "order-summary-side-menu__popup--voucher-footer",
  voucherApplyButtonClassName: "btn btn-orange",
  pointsContainerClassName: "order-summary-side-menu__popup",
};

const classesEmptyComponent = {
  emptyContainer: "cart-side-menu__empty",
  emptyTitle: "cart-side-menu__empty--title",
  emptyDesc: "cart-side-menu__empty--desc",
};

const classesOrderSum = (auth) => {
  let classes = classesOrderSummary;
  classes.voucherButtonClassName = `${auth ? "col-6" : "col-12"
    } order-summary-side-menu__header--features`;
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
      voucher: <FontAwesomeIcon icon={faTicketAlt} height="1em" />,
      points: <FontAwesomeIcon icon={faCrown} height="1em" />,
      close: <FontAwesomeIcon icon={faTimes} height="1em" />,
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
        <Popup setPopup={setShowModalErrorAddToCart}>
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
          removeIcon={<FontAwesomeIcon icon={faTrash} height="1em" />}
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
