/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { parseCookies } from 'lib/parseCookies'
import Router from 'next/router'
import {
  X as XIcon,
  Trash,
  ChevronDown,
  ChevronUp,
} from 'react-feather'
import { toast } from 'react-toastify'
import {
  CartDetails,
  OrderSummary,
  isProductRecommendationAllowed,
  Products,
  useI18n,
} from '@sirclo/nexus'

/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'

/* components */
import Layout from 'components/Layout/Layout'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Placeholder from 'components/Placeholder'
import Popup from 'components/Popup/Popup'
import Breadcrumblink from 'components/Breadcrumb/Breadcrumblink'

/* styles */
import styles from 'public/scss/pages/Cart.module.scss'
import stylesOrderSummary from 'public/scss/components/OrderSummaryCart.module.scss'
import stylesPagination from 'public/scss/components/Pagination.module.scss'

const classesCartDetails = {
  className: styles.cart,
  cartHeaderClassName: "d-none",
  itemClassName: styles.cartItem,
  itemImageClassName: styles.cartItem_image,
  itemTitleClassName: styles.cartItem_detail,
  itemPriceClassName: styles.cartItem_priceCalculate,
  itemRegularPriceClassName: styles.cartItem_priceRegular,
  itemSalePriceClassName: styles.cartItem_priceSale,
  itemSalePriceWrapperClassName: styles.cartItem_priceSaleWrapper,
  itemDiscountNoteClassName: styles.cartItem_discNote,
  itemRegularAmountClassName: "d-none",
  headerQtyClassName: "d-none",
  itemQtyClassName: styles.cartItem_qty,
  qtyBoxClassName: styles.cartItem_qtyBox,
  itemAmountClassName: styles.cartItem_price,
  itemEditClassName: "d-none",
  itemRemoveClassName: styles.cartItem_remove,
  cartFooterClassName: `${styles.cart_cartFooter} ${styles.sirclo_form_row} w-100`,
  cartFooterTitleClassName: styles.cartFooter_title,
  cartFooterTextareaClassName: `form-control ${styles.sirclo_form_input} ${styles.cartFooter_input} py-2`,
};

const classesCrosselProducts = {
  productContainerClassName: ` mb-0 products_list ${styles.product} ${styles.productdetail_relatedProductItem}`,
  stickerContainerClassName: styles.product_sticker,
  outOfStockLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__outofstock}`,
  saleLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__sale}`,
  comingSoonLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__comingsoon}`,
  openOrderLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__openorder}`,
  preOrderLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__preorder}`,
  newLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__new}`,
  productImageContainerClassName: styles.product_link,
  productImageClassName: styles.product_link__image,
  productLabelContainerClassName: styles.product_label,
  productTitleClassName: styles.product_label__title,
  productPriceClassName: styles.product_labelPrice,
  salePriceClassName: styles.product_labelPrice__sale,
  priceClassName: styles.product_labelPrice__price,
};

const classesOrderSummary = {
  containerClassName: stylesOrderSummary.container,
  headerClassName: stylesOrderSummary.header,
  voucherButtonClassName: stylesOrderSummary.voucherButton,
  voucherIconClassName: stylesOrderSummary.voucherIcon,
  voucherTextClassName: stylesOrderSummary.voucherText,
  pointsButtonClassName: stylesOrderSummary.pointsButton,
  pointsIconClassName: stylesOrderSummary.pointsIcon,
  pointsTextClassName: stylesOrderSummary.pointsText,
  subTotalClassName: stylesOrderSummary.subTotal,
  subTotalTextClassName: stylesOrderSummary.subTotalText,
  subTotalPriceClassName: stylesOrderSummary.subTotalPrice,
  footerClassName: stylesOrderSummary.footer,
  submitButtonClassName: stylesOrderSummary.submitButton,
  continueShoppingClassName: stylesOrderSummary.continueShopping,

  //Popup
  popupClassName: styles.ordersummary_overlay,
  numberOfPointsClassName: styles.ordersummary_popupPoints,
  labelClassName: styles.ordersummary_popupPointsLabel,
  valueClassName: styles.ordersummary_popupPointsValue,
  closeButtonClassName: styles.ordersummary_popupClose,
  voucherContainerClassName: `${styles.ordersummary_popupVoucherContainer} ${styles.ordersummary_popup}`,
  voucherFormContainerClassName: `${styles.ordersummary_voucherFormContainer} ${styles.ordersummary_popupFormContainer}`,
  voucherFormClassName: `${styles.ordersummary_voucherForm} ${styles.sirclo_form_row}`,
  voucherInputClassName: `form-control ${styles.sirclo_form_input} ${styles.ordersummary_popupFormInput}`,
  voucherSubmitButtonClassName: `btn ${styles.btn_primary} ${styles.ordersummary_popupFormButton}`,
  voucherListClassName: styles.ordersummary_popupVoucher,
  voucherListHeaderClassName: styles.ordersummary_popupVoucherTitle,
  voucherClassName: styles.ordersummary_popupVoucherItem,
  voucherDetailClassName: styles.ordersummary_popupVoucherDetail,
  voucherDetailCodeClassName: styles.ordersummary_popupVoucherDetailCode,
  voucherDetailTitleClassName: styles.ordersummary_popupVoucherDetailTitle,
  voucherDetailDescClassName: styles.ordersummary_popupVoucherDetailDesc,
  voucherDetailEstimateClassName : styles.ordersummary_popupVoucherDetailDesc,
  voucherFooterClassName: styles.ordersummary_popupVoucherFooter,
  voucherApplyButtonClassName: `btn ${styles.btn_primary}`,
  pointsContainerClassName: styles.ordersummary_popup,
  expandedDivClassName: styles.ordersummary_expanded,
  expandedLabelClassName: styles.ordersummary_expandedLabel,
  expandedPriceClassName: styles.ordersummary_expandedPrice,
  expandButtonClassName: "d-none",
  voucherButtonAppliedClassName: styles.ordersummary_voucherAppliedButton,
  voucherAppliedIconClassName: styles.ordersummary_voucherAppliedIcon,
  voucherAppliedTextClassName: styles.ordersummary_voucherAppliedText,
  voucherButtonRemoveClassName: styles.ordersummary_voucherAppliedRemove,
};

const paginationClasses = {
  pagingClassName: `col-12 ${stylesPagination.pagination}`,
  activeClassName: stylesPagination.pagination_active,
  itemClassName: stylesPagination.pagination_item,
};

const classesEmptyComponent = {
  emptyContainer: styles.cart_empty,
  emptyTitle: styles.cart_emptyTitle,
};

const classesPlaceholderOrderSummary = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__orderSummary}`,
};

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__card}`,
};

const classesPlaceholderCart = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__cart}`,
};

const Cart: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size: any = useWindowSize();
  const allowedProductRecommendation = isProductRecommendationAllowed();

  const [SKUs, setSKUs] = useState<Array<string>>(null);
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] =
    useState<boolean>(false);
  const [invalidMsg, setInvalidMsg] = useState<string>("");
  const [pageInfo, setPageInfo] = useState({
    itemPerPage: null,
  });
  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("cart.title")}`,
  ];

  const toogleErrorAddToCart = () =>
    setShowModalErrorAddToCart(!showModalErrorAddToCart);

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      titleHeader={i18n.t("cart.title")}
      withCart={false}
      customClassName={`${styles.cart_layout} ${styles.main__noNavbar}`}
    >
      {invalidMsg !== "" && (
        <div className={styles.cartError}>
          <div className={styles.cartError_inner}>{invalidMsg}</div>
        </div>
      )}
      <Breadcrumblink
        links={linksBreadcrumb}
        lng={lng}
      />
      <div className="container">
      </div>
      <section className={styles.cart_container}>
        <div className="container ">
          <div className="row">
            <div className={SKUs?.length > 0 ? "col-12 col-lg-8" : "col-12 col-lg-8 offset-lg-2"}>
              {SKUs?.length > 0 && <div>
                <h3>{i18n.t("cart.title")}</h3>
                <span className={styles.cart_notready}>{i18n.t("cart.notready")}</span>
                <span className={styles.cart_notready_shopnow} onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}>{i18n.t("cart.shopNow")}</span>
                </div>}
              <CartDetails
                getSKU={(SKUs: any) => setSKUs(SKUs)}
                classes={classesCartDetails}
                itemRedirectPathPrefix="product"
                isEditable={true}
                removeIcon={<Trash />}
                onErrorMsg={() => setShowModalErrorAddToCart(true)}
                onInvalidMsg={(msg) => setInvalidMsg(msg)}
                thumborSetting={{
                  width: size.width < 768 ? 200 : 400,
                  format: "webp",
                  quality: 85,
                }}
                loadingComponent={
                  <div className="row">
                    <div className="col-4 pr-0">
                      <Placeholder classes={classesPlaceholderCart} withImage />
                    </div>
                    <div className="col-8">
                      <Placeholder classes={classesPlaceholderCart} withImage />
                    </div>
                    <div className="col-4 pr-0">
                      <Placeholder classes={classesPlaceholderCart} withImage />
                    </div>
                    <div className="col-8">
                      <Placeholder classes={classesPlaceholderCart} withImage />
                    </div>
                  </div>
                }
                emptyCartPlaceHolder={
                  <EmptyComponent
                    classes={classesEmptyComponent}
                    title={i18n.t("cart.isEmpty")}
                    button={
                      <button
                        className={`${styles.btn} ${styles.btn_primary} ${styles.btn_long} my-1`}
                        onClick={() =>
                          Router.push("/[lng]/products", `/${lng}/products`)
                        }
                      >
                        {i18n.t("cart.shopNow")}
                      </button>
                    }
                  />
                }
              />
            </div>
            { SKUs?.length > 0 && (
            <div className="col-12 col-lg-4 no-padding-mobile-pad">
              <OrderSummary
                classes={classesOrderSummary}
                currency="IDR"
                submitButtonLabel={i18n.t("orderSummary.placeOrder")}
                continueShoppingLabel={i18n.t("orderSummary.viewCart")}
                page={"cart"}
                continueShoppingRoute="cart"
                isAccordion={true}
                onErrorMsg={() => setShowModalErrorAddToCart(true)}
                onErrorMsgCoupon={(msg) => toast.error(msg)}
                icons={{
                  voucher: (
                    <img
                      src="/images/mdi_ticket-percent_base_red.svg"
                      alt="icon"
                    />
                  ),
                  voucherApplied: (
                    <img src="/images/mdi_ticket-percent_base_red.svg" alt="icon" />
                  ),
                  points: <img src="/images/mdi_star-circle.svg" alt="icon" />,
                  pointsApplied: (
                    <img src="/images/mdi_star-circle.svg" alt="icon" />
                  ),
                  close: <XIcon />,
                  collapse: <ChevronUp />,
                  expand: <ChevronDown />,
                  voucherRemoved: <XIcon />,
                }}
                loadingComponent={
                  <div className="row m-3 mb-0">
                    <div className="col-6 pl-0">
                      <Placeholder
                        classes={classesPlaceholderOrderSummary}
                        withImage
                      />
                    </div>
                    <div className="col-6 px-0">
                      <Placeholder
                        classes={classesPlaceholderOrderSummary}
                        withImage
                      />
                    </div>
                  </div>
                }
              />
            </div>
            )}
          </div>
          {SKUs?.length > 0 && allowedProductRecommendation &&
            pageInfo.itemPerPage !== 10 &&
            SKUs !== null && (
          <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1">
              <div className={styles.productdetail_relatedProductHeader}>
                <h6 className={styles.productdetail_relatedProductTitle}>
                  {i18n.t("product.related")}
                </h6>
              </div>
              <div className={styles.productdetail_relatedProduct}>
                <LazyLoadComponent>
                  <Products
                    filter={{ openOrderScheduled: false, published: true }}
                    classes={classesCrosselProducts}
                    itemPerPage={4}
                    isButton
                    getCrossSellPageInfo={setPageInfo as any}
                    paginationClasses={paginationClasses}
                    callPaginatio={true}
                    fullPath={`product/{id}`}
                    pathPrefix={`product`}
                    lazyLoadedImage={false}
                    loadingComponent={
                      <>
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage
                        />
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage
                        />
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage
                        />
                      </>
                    }
                    thumborSetting={{
                      width: size.width < 768 ? 350 : 600,
                      format: "webp",
                      quality: 85,
                    }}
                  />
                </LazyLoadComponent>
              </div>
            </div>
          </div>
        </div>
            )}
        </div>
      </section>
      {showModalErrorAddToCart && (
        <Popup
          withHeader
          setPopup={toogleErrorAddToCart}
          mobileFull={false}
          classPopopBody
        >
          <div className={styles.popup_popupError}>
            <h3 className={styles.popup_popupErrorTitle}>
              {i18n.t("cart.errorSKUTitle")}
            </h3>
            <p className={styles.popup_popupErrorDesc}>
              {i18n.t("cart.errorSKUDesc")}{" "}
            </p>
          </div>
        </Popup>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  if (process.env.IS_PROD !== "false") {
    const cookies = parseCookies(req);
    res.writeHead(307, {
      Location: `/${cookies.ACTIVE_LNG || "id"}`,
    });
    res.end();
  }

  const brand = await useBrand(req);
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || "id"
  const { default: lngDict = {} } = await import(
    `locales/${defaultLanguage}.json`
  );

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || "",
    },
  };
};

export default Cart;
