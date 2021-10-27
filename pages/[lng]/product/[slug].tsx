import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Router from "next/router";
import {
  getProductDetail,
  ProductDetail,
  Products,
  useI18n,
  isProductRecommendationAllowed,
  ProductReviews,
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Placeholder from "components/Placeholder";
import EmptyComponent from "components/EmptyComponent/EmptyComponent";
import SEO from "components/SEO/SEO";
import { GRAPHQL_URI } from "lib/Constants";
import useWindowSize from "lib/utils/useWindowSize";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faClock,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faCheckCircle,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useBrand } from "lib/utils/useBrand";

const Quickview = dynamic(() => import("components/Quickview/Quickview"));
const Popup = dynamic(() => import("components/Popup/Popup"));
const SocialShare = dynamic(() => import("components/SocialShare/SocialShare"));

const classesRecomendation = {
  productContainerClassName: "col-6 col-md-3 products__item",
  productImageClassName: "products__item--image",
  productImageContainerClassName: "image-container",
  productLabelContainerClassName: "products__item--contentRecomendation",
  productTitleClassName: "products__item--contentRecomendation-title",
  productPriceClassName: "products__item--contentRecomendation-price",
  stickerContainerClassName: "products__item-sticker",
  outOfStockLabelClassName: "products__item-sticker--outofstock",
  comingSoonLabelClassName: "products__item-sticker--comingsoon",
  openOrderLabelClassName: "products__item-sticker--openorder",
  saleLabelClassName: "products__item-sticker--sale",
  preOrderLabelClassName: "products__item-sticker--preorder",
  newLabelClassName: "products__item-sticker--new",
  buttonClassName: "products__item--buttonQuickview",
  salePriceClassName: "products__item--contentRecomendation-price--sale",
};

const classesProductDetail = {
  productDetailParentDivClassName: "product-detail__container",
  rowClassName: "row product-detail__row",
  imageRowClassName: "col-12 col-md-6 product-detail__left",
  mainImageClassName: "product-detail__left--image",
  thumbnailImageClassName: "image-thumb",
  propertyRowClassName: "col-12 col-md-6 product-detail__right",
  detailTitleStarClassName: "mr-2",
  detailTitleContainerClassName:
    "product-detail__right--detailTitle-container order-1",
  detailTitleClassName: "product-detail__right--detailTitle-title",
  openOrderClassName: "product-detail__openorder",
  openOrderTitleClassName: "product-detail__openorder-title",
  openOrderContainerClassName: "product-detail__openorder-container",
  openOrderDateClassName: "product-detail__openorder-container--date",
  openOrderTimeClassName: "product-detail__openorder-container--time",
  countDownContainerClassName: "product-detail__openorder-countdown",
  countDownItemClassName: "product-detail__openorder-countdown-item",
  countDownItemTextClassName: "product-detail__openorder-countdown-item--text",
  openOrderTimeoutClassName: "product-detail__openorder-timeout",
  openOrderTimeoutDescClassName: "product-detail__openorder-timeout--desc",
  openOrderTimeoutBtnClassName: "btn btn-orange btn-long mt-3",
  selectedVariantContainerClassName: "d-none",
  propertyInnerContainerClassName: "product-detail__right--form order-3",
  propertyFooterContainerClassname:
    "order-4 product-detail_propertyFooterContainer",
  variantContainerClassName: "product-detail__right--form-variant",
  variantOptionsContainerClassName:
    "product-detail__right--form-variant-container",
  variantLabelClassName: "product-detail__right--form-variant-title",
  variantOptionsClassName: "product-detail__right--form-variant-option",
  qtyBoxClassName: "product-detail__right--form-qty",
  addToCartBtnClassName: "product-detail_addToCartBtn btn btn-orange-outer",
  buyNowBtnClassName: "product-detail_buyNowBtn btn btn-orange",
  descriptionClassName: "product-detail__right--desc order-5",
  additionalInfoClassName: "d-none",
  salePriceClassName: "products__item--content-detail-price--sale ",
  notifyMeClassName: "product-detail_notifyMe",
  notifyMeLabelClassName: "product-detail_notifyMeLabel",
  notifyMeOptionsClassName: "product-detail_notifyMeOptions",
  notifyMeOptionClassName: "product-detail_notifyMeOption",
  notifyMeRadioClassName: "product-detail_notifyMeRadio",
  notifyMeRadioLabelClassName: "product-detail_notifyMeRadioLabel",
  notifyMeInputWrapperClassName: "product-detail_notifyMeInputWrapper",
  notifyMeInputClassName: "product-detail_notifyMeInput",
  notifyMeSubmitClassName: "btn btn-orange btn-long mt-3",

  /* Estimate Shipping */
  estimateShippingWrapperClassName: "estimateShipping order-6",
  estimateShippingTitleClassName: "estimateShipping_title",
  estimateShippingShowCourierClassName: "estimateShipping_showCourier",
  estimateShippingDetailClassName: "estimateShipping_detail",
  estimateShippingLogoClassName: "estimateShipping_detailLogo",
  estimateShippingCostClassName: "estimateShipping_detailCost",

  /* Estimate Shipping Popup */
  estimateShippingPopupContainerClassName: "estimateShipping_popup",
  estimateShippingPopupContentClassName: "estimateShipping_popupContent",
  estimateShippingPopupHeaderClassName: "estimateShipping_popupHeader",
  estimateShippingPopupTitleClassName: "estimateShipping_popupTitle",
  estimateShippingPopupButtonCloseClassName: "estimateShipping_popupClose",
  estimateShippingPopupBodyClassName: "estimateShipping_popupBody",
  estimateShippingPopupProviderClassName: "estimateShipping_popupProvider",
  estimateShippingPopupLineInfoClassName: "estimateShipping_popupLineInfo",
  estimateShippingPopupLabelClassName: "estimateShipping_popupLabel",
  estimateShippingPopupValueClassName: "estimateShipping_popupValue",
  estimateShippingPopupLineProviderClassName:
    "estimateShipping_popupProviderItem",
  estimateShippingPopupProviderImgClassName:
    "estimateShipping_popupProviderLogo",
  estimateShippingPopupProviderLabelClassName:
    "estimateShipping_popupProviderLabel",
  estimateShippingPopupProviderValueClassName:
    "estimateShipping_popupProviderValue",
};

const ProductReviewsClasses = {
  reviewImageContainerClassName: "ratingReview_imageContainer",
  reviewImageClassName: "ratingReview_image",
  filtersClassName: "ratingReview_filters",
  filterClassName: "ratingReview_filter",
  activeFilterClassName: "ratingReview_filterActive",
  filterLabelClassName: "ratingReview_filterLabel",
  filterInputClassName: "ratingReview_filterInput",
  filterIconClassName: "ratingReview_filterIcon",
  sortClassName: "ratingReview_sort",
  sortOptionsClassName: "form-control ratingReview_sortOptions",
  reviewListContainerClassName: "ratingReview_container",
  reviewListStarContainerClassName: "ratingReview_starContainer",
  reviewListDescriptionClassName: "ratingReview_desc",
  reviewListImageContainerClassName: "ratingReview_imageContainer",
  reviewListImageClassName: "ratingReview_image",
  reviewListFooterClassName: "ratingReview_footer",
  reviewListAuthorClassName: "ratingReview_author",
  reviewListDateClassName: "ratingReview_date",
  itemPerPageClassName: "ratingReview_itemPerPage",
  itemPerPageLabelClassName: "ratingReview_itemPerPageLabel",
  itemPerPageOptionsClassName: "ratingReview_itemPerPageOptions",
  reviewPopupContainerClassName: "ratingReview_popupContainer",
  reviewPopupContentClassName: "ratingReview_popupContent",
  reviewPopupPreviewClassName: "ratingReview_popupPreview",
  reviewPopupImagePreviewClassName: "ratingReview_popupImagePreview",
  reviewPopupImagePopupClassName: "ratingReview_popupImage",
  reviewPopupLeftButtonClassName: "ratingReview_popupLeftButton",
  reviewPopupRightButtonClassName: "ratingReview_popupRightButton",
  reviewPopupButtonCloseClassName: "ratingReview_popupButtonClose",
};

const paginationClasses = {
  pagingClassName: "orderReview-pagination-order",
  itemClassName: "orderReview-pagination-order-list",
  activeClassName: "active",
  linkClassName: "orderReview-pagination-order-list-link",
};

const classesPlaceholderProduct = {
  placeholderImage: "placeholder-item placeholder-item__product--card",
  placeholderTitle: "placeholder-item placeholder-item__product--title",
  placeholderList: "placeholder-item placeholder-item__product--list",
};

const classesEmptyComponent = {
  emptyContainer: "reviews__empty",
  emptyTitle: "reviews__empty--title",
  emptyDesc: "reviews__empty--desc",
};

const Product: FC<any> = ({
  lng,
  lngDict,
  slug,
  data,
  urlSite,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();
  const [isQuickview, setIsQuickview] = useState<boolean>(false);
  const [productsSlug, setProductsSlug] = useState<string>("");
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] =
    useState<boolean>(false);
  const [showModalAddToCart, setShowModalAddToCart] = useState<boolean>(false);
  const [showModalNotifyMe, setShowModalNotifyMe] = useState<boolean>(false);
  const allowedProductRecommendation = isProductRecommendationAllowed();
  const [productId, setProductId] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [totalAllReviews, setTotalAllReviews] = useState(null);

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("product.detailProduct")}`,
  ];

  const handleFailedAddToCart = () => {
    setIsQuickview(false);
    setShowModalErrorAddToCart(true);
  };

  const handleCompleteAddToCart = () => {
    setIsQuickview(false);
    setShowModalAddToCart(true);
  };

  const handleCompleteNotifyMe = () => {
    setIsQuickview(false);
    setShowModalNotifyMe(true);
  };

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      {isQuickview && productsSlug && (
        <Quickview
          slug={productsSlug}
          setIsQuickView={setIsQuickview}
          handleFailedAddToCart={handleFailedAddToCart}
          handleCompleteAddToCart={handleCompleteAddToCart}
          handleCompleteNotifyMe={handleCompleteNotifyMe}
          i18n={i18n}
          urlSite={urlSite}
        />
      )}
      {showModalErrorAddToCart && (
        <Popup setPopup={setShowModalErrorAddToCart}>
          <div className="product-detail_errorAddCart">
            <h3 className="product-detail_errorAddCartTitle">
              {i18n.t("cart.errorSKUTitle")}
            </h3>
            <p className="product-detail_errorAddCartDesc">
              {i18n.t("cart.errorSKUDesc")}{" "}
            </p>
          </div>
        </Popup>
      )}
      {showModalNotifyMe && (
        <Popup setPopup={setShowModalNotifyMe} withClose={false}>
          <div className="product-detail_errorAddCart">
            <h3 className="product-detail_errorAddCartTitle">
              {i18n.t("product.notifyTitleSuccess")}
            </h3>
            <p className="product-detail_errorAddCartDesc">
              {i18n.t("product.notifySuccess")}
            </p>
            <button
              className="btn btn-orange btn-long mt-3"
              onClick={() => {
                setShowModalNotifyMe(false);
                Router.push("/[lng]/products", `/${lng}/products`);
              }}
            >
              {i18n.t("global.continueShopping")}
            </button>
          </div>
        </Popup>
      )}
      {showModalAddToCart && (
        <Popup setPopup={setShowModalAddToCart} withClose={false}>
          <div className="product-detail_errorAddCart">
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="6x"
              color="#00BA3F"
              className="mb-4"
            />
            <p className="product-detail_errorAddCartDesc">
              {i18n.t("product.successAddToCart")}
            </p>
            <button
              className="btn btn-orange btn-long mt-4"
              onClick={() => {
                setShowModalAddToCart(false);
                Router.push("/[lng]/cart", `/${lng}/cart`);
              }}
            >
              {i18n.t("cart.title")}
            </button>
            <button
              className="btn btn-orange-outer btn-long mt-3"
              onClick={() => setShowModalAddToCart(false)}
            >
              {i18n.t("global.continueShopping")}
            </button>
          </div>
        </Popup>
      )}
      <Breadcrumb
        title={i18n.t("product.detailProduct")}
        links={linksBreadcrumb}
        lng={lng}
      />
      {data && (
        <SEO
          title={data?.details[0]?.name || ""}
          description={data?.SEOs[0]?.description || ""}
          keywords={data?.SEOs[0]?.keywords?.join(", ") || ""}
          image={data?.imageURLs[0] || ""}
        />
      )}
      <section>
        <div className="container">
          {data === null ? (
            <div className="col-12">
              <EmptyComponent
                classes={classesEmptyComponent}
                logo={
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="products__empty--icon"
                  />
                }
                title={i18n.t("product.notFound")}
              />
            </div>
          ) : (
            <ProductDetail
              slug={slug}
              withButtonBuyNow
              enableAutoColorVariant={true}
              lazyLoadedImage={false}
              withSeparatedVariant={true}
              isButton={{ 0: false, 1: false }}
              classes={classesProductDetail}
              onError={() => setShowModalErrorAddToCart(true)}
              onErrorMsg={(msg) => msg && toast.error(msg)}
              onComplete={() => setShowModalAddToCart(true)}
              onCompleteMsg={() => setShowModalNotifyMe(true)}
              getProductID={(id) => setProductId(id)}
              withEstimateShipping={true}
              notifyIcon={
                <FontAwesomeIcon
                  icon={faBell}
                  className="product-detail_notifyMeIconButton"
                />
              }
              openOrderIconDate={
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="product-detail__openorder-container--icon"
                />
              }
              openOrderIconTime={
                <FontAwesomeIcon
                  icon={faClock}
                  className="product-detail__openorder-container--icon"
                />
              }
              thumborSetting={{
                width: size.width < 768 ? 512 : 800,
                format: "webp",
                quality: 100,
              }}
              customDetailComponent={
                <>
                  <div className="product-detail__right-share order-7">
                    <p className="m-0 p-0">{i18n.t("product.shareTitle")}</p>
                    <SocialShare urlSite={urlSite} />
                  </div>
                </>
              }
              loadingComponent={
                <div className="product-detail__container">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withImage
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withTitle
                      />
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withList
                        listMany={3}
                      />
                    </div>
                  </div>
                </div>
              }
            />
          )}
        </div>
        {brand?.settings?.reviewsAndRatingEnabled && (
          <div className={"ratingReview"}>
            <div className="container">
                  <h2 className={"ratingReview_titleSection"}>
                    {i18n.t("product.ratingReviewTitle")} (
                    {totalAllReviews === null ? "..." : totalAllReviews})
                  </h2>
                  <ProductReviews
                    productID={productId}
                    productName={slug}
                    classes={ProductReviewsClasses}
                    reviewsPaginationClasses={paginationClasses}
                    getTotalAllReviews={(totalItem: number) =>
                      setTotalAllReviews(totalItem)
                    }
                    itemPerPageOptions={[5, 10, 25, 50, 100]}
                    customEmptyComponentReviews={
                      <div className="emptyReview d-flex my-4 justify-content-center align-items-center flex-column">
                        <img src="/icon/emptyReview.svg" />
                        <div className="heading__desc">
                          <p>{i18n.t("product.emptyReviews")}</p>
                        </div>
                      </div>
                    }
                    iconClose={
                      <FontAwesomeIcon icon={faTimes} height="1.25em" />
                    }
                    iconLeft={
                      <FontAwesomeIcon
                        className="text-white"
                        icon={faChevronLeft}
                        height="1.5em"
                      />
                    }
                    iconRight={
                      <FontAwesomeIcon
                        className="text-white"
                        icon={faChevronRight}
                        height="1.5em"
                      />
                    }
                    reviewsNextLabel={
                      <FontAwesomeIcon
                        className="text-gray-900"
                        icon={faChevronRight}
                        height="1.5em"
                      />
                    }
                    reviewsPrevLabel={
                      <FontAwesomeIcon
                        className="text-gray-900"
                        icon={faChevronLeft}
                        height="1.5em"
                      />
                    }
                    loadingComponent={
                      <>
                        <div className="col-12 col-md-12 mb-4">
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage
                            withList
                          />
                        </div>
                      </>
                    }
                    thumborSetting={{
                      width: size.width < 575 ? 350 : 500,
                      format: "webp",
                      quality: 85,
                    }}
                  />
            </div>
          </div>
        )}
        {allowedProductRecommendation &&
          (totalItems > 0 || totalItems === null) && (
            <div className="container">
              <hr className="hr-page" />
              <div className="heading">
                <div className="heading__title">
                  <h5>{i18n.t("product.relatedProduct")}</h5>
                </div>
                <div className="heading__desc">
                  <p>{i18n.t("product.relatedProductDesc")}</p>
                </div>
              </div>
              <div className="row products-list">
                <LazyLoadComponent>
                  <Products
                    filter={{ openOrderScheduled: false, published: true }}
                    slug={slug}
                    classes={classesRecomendation}
                    itemPerPage={4}
                    getPageInfo={(pageInfo: any) =>
                      setTotalItems(pageInfo.totalItems)
                    }
                    withSeparatedVariant={true}
                    isQuickView={setIsQuickview}
                    getQuickViewSlug={setProductsSlug}
                    quickViewFeature={true}
                    fullPath={`product/{id}`}
                    pathPrefix={`product`}
                    lazyLoadedImage={false}
                    thumborSetting={{
                      width: size.width < 768 ? 375 : 512,
                      format: "webp",
                      quality: 85,
                    }}
                    loadingComponent={
                      <>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage
                          />
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage
                          />
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage
                          />
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage
                          />
                        </div>
                      </>
                    }
                  />
                </LazyLoadComponent>
              </div>
            </div>
          )}
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const { slug } = params;

  const data = await getProductDetail(GRAPHQL_URI(req), slug.toString());
  const brand = await useBrand(req);
  const urlSite = `https://${req.headers.host}/${params.lng}/product/${slug}`;

  return {
    props: {
      lng: params.lng,
      slug,
      lngDict,
      data: data || null,
      urlSite,
      brand: brand || "",
    },
  };
};

export default Product;
