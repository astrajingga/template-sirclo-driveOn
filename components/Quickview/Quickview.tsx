import { FC } from "react";
import dynamic from "next/dynamic";
import { ProductDetail } from "@sirclo/nexus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";
import useWindowSize from "lib/utils/useWindowSize";
import { toast } from "react-toastify";

const SocialShare = dynamic(() => import("components/SocialShare/SocialShare"));

export type QuickviewPropsType = {
  slug: string,
  setIsQuickView: (open: boolean) => void;
  handleFailedAddToCart: (message: string) => void;
  handleCompleteAddToCart: (message: string) => void;
  handleCompleteNotifyMe: (message: string) => void;
  i18n: any,
  urlSite: string
}

const productDetailClasses = {
  productDetailParentDivClassName: "quickview__inner",
  rowClassName: "row",
  imageRowClassName: "col-12 col-md-4 quickview__inner-left",
  mainImageClassName: "quickview__inner-left--image",
  thumbnailImageClassName: "quickview__inner-left--image-thumb",
  propertyRowClassName: "col-12 col-md-8 quickview__inner-right",
  detailTitleStarClassName: "mr-2",
  detailTitleContainerClassName: "quickview__inner-right--detailTitle-container",
  detailTitleClassName: "quickview__inner-right--detailTitle-title",
  selectedVariantContainerClassName: "d-none",
  propertyInnerContainerClassName: "quickview__inner-right-detail",
  variantContainerClassName: "quickview__inner-right-detail--size-color",
  variantOptionsClassName: "quickview__inner-right-detail--size-color-select",
  qtyBoxClassName: "quickview__inner-right-detail--quantity",
  addToCartBtnClassName: "product-detail_addToCartBtn btn btn-orange-outer my-2",
  buyNowBtnClassName: "product-detail_buyNowBtn btn btn-orange my-2",
  descriptionClassName: "quickview__inner-right-detail--desc",
  accordionClassName: "quickview__inner-right-detail--desc-tab",
  salePriceClassName: "products__item--content-price--sale",
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
  notifyMeClassName: "product-detail_notifyMe",
  notifyMeLabelClassName: "product-detail_notifyMeLabel",
  notifyMeOptionsClassName: "product-detail_notifyMeOptions",
  notifyMeOptionClassName: "product-detail_notifyMeOption",
  notifyMeRadioClassName: "product-detail_notifyMeRadio",
  notifyMeRadioLabelClassName: "product-detail_notifyMeRadioLabel",
  notifyMeInputWrapperClassName: "product-detail_notifyMeInputWrapper",
  notifyMeInputClassName: "product-detail_notifyMeInput",
  notifyMeSubmitClassName: "btn btn-orange btn-long mt-3"
}

const Quickview: FC<QuickviewPropsType> = ({
  slug,
  setIsQuickView,
  handleFailedAddToCart,
  handleCompleteAddToCart,
  handleCompleteNotifyMe,
  i18n,
  urlSite
}) => {
  const size = useWindowSize();

  return (
    <div className="quickview__overlay">
      <div className="quickview__container">
        <span className="close-button" onClick={() => setIsQuickView(false)}>
          <FontAwesomeIcon icon={faTimes} className="close-icon" />
        </span>
        <ProductDetail
          withButtonBuyNow
          slug={slug}
          lazyLoadedImage={false}
          classes={productDetailClasses}
          isButton={{ 0: false, 1: false }}
          withSeparatedVariant={true}
          onError={handleFailedAddToCart}
          onErrorMsg={(msg) => toast.error(msg)}
          onComplete={handleCompleteAddToCart}
          onCompleteMsg={handleCompleteNotifyMe}
          loadingComponent={
            <div className="mx-auto loader">
              <Loader color="text-dark" />
            </div>
          }
          thumborSetting={{
            width: size.width < 768 ? 512 : 800,
            format: "webp",
            quality: 85,
          }}
          openOrderIconDate={<FontAwesomeIcon icon={faCalendarAlt} className="product-detail__openorder-container--icon" />}
          openOrderIconTime={<FontAwesomeIcon icon={faClock} className="product-detail__openorder-container--icon" />}
          customDetailComponent={
            <>
              <div className="product-detail__right-share">
                <p className="m-0 p-0">{i18n.t("product.shareTitle")}</p>
                <SocialShare urlSite={urlSite} />
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Quickview;