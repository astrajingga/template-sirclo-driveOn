import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  useI18n,
  CartDetails,
  Products,
  isProductRecommendationAllowed
} from "@sirclo/nexus";
import Link from "next/link";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import EmptyComponent from "components/EmptyComponent/EmptyComponent";
import Placeholder from "components/Placeholder";
import { parseCookies } from "lib/parseCookies";
import { useBrand } from "lib/utils/useBrand";
import useWindowSize from "lib/utils/useWindowSize";
import { toast } from "react-toastify";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCartPlus
} from "@fortawesome/free-solid-svg-icons";

import OrderSummaryBox from 'components/OrderSummaryBox/OrderSummaryBox';

const classesCartDetails = {
  className: "cart-table",
  cartHeaderClassName: "d-none d-lg-block cart-table__header",
  headerImageClassName: "cart-table__header--image",
  headerTitleClassName: "cart-table__header--title",
  headerPriceClassName: "cart-table__header--price",
  headerQtyClassName: "cart-table__header--qty",
  headerAmountClassName: "cart-table__header--amount",
  headerRemoveClassName: "cart-table__header--remove",
  cartBodyClassName: "cart-table__body",
  itemClassName: "cart-table__body--item",
  itemImageClassName: "cart-table__body--item-image",
  itemTitleClassName: "cart-table__body--item-detail",
  titleClassName: "cart-table__body--item-title",
  selectedVariantContainerClassName: "cart-table__body--item-variant",
  selectedVariantClassName: "cart-table__body--item-variant-selected",
  itemPriceClassName: "cart-table__body--item-priceContainer",
  itemRegularPriceClassName: "cart-table__body--item-priceRegular",
  itemSalePriceWrapperClassName: "d-none d-md-block",
  itemQtyClassName: "cart-table__body--item-qty",
  qtyBoxClassName: "cart-table__body--item-qty-box",
  changeQtyButtonClassName: "cart-table__body--item-qty-box-action",
  disabledClassName: "cart-table__body--item-qty-box-action-disable",
  itemAmountClassName: "cart-table__body--item-amount",
  itemDiscountNoteClassName: "cart-table__body--item-amountNote",
  itemEditClassName: "cart-table__body--item-edit",
  itemRemoveClassName: "cart-table__body--item-remove",
  removeButtonClassName: "cart-table__body--item-remove-icon",
  cartFooterClassName: "cart-table__footer sirclo-form-row mb-0",
  cartFooterTitleClassName: "cart-table__footer--title",
  cartFooterTextareaClassName: "form-control sirclo-form-input cart-table__footer--input"
};

const classesProducts = {
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
  salePriceClassName: "products__item--contentRecomendation-price--sale"
}

const paginationClasses = {
  pagingClassName: "col-12 cart_pagination",
  itemClassName: "cart_paginationItem"
}

const classesEmptyComponent = {
  emptyContainer: "cart-table__empty",
  emptyTitle: "cart-table__empty--title",
  emptyDesc: "cart-table__empty--desc",
};

const classesPlaceholderProduct = {
  placeholderImage: "placeholder-item placeholder-item__product--card",
  placeholderTitle: "placeholder-item placeholder-item__product--title",
  placeholderList: "placeholder-item placeholder-item__product--list",
}

const Cart: FC<any> = ({
  lng,
  lngDict,
  auth,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();
  const [SKUs, setSKUs] = useState<Array<string>>(null);
  const [invalidMsg, setInvalidMsg] = useState<string>("");
  const allowedProductRecommendation = isProductRecommendationAllowed();
  const [pageInfo, setPageInfo] = useState({
    totalItems: null,
  });

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("cart.title")}`,
  ];

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb
        // title={i18n.t("cart.title")}
        links={linksBreadcrumb}
        lng={lng}
      />
      <div className="container">
        <div className="cart margin-step-payment">
          <div className="row">
            <div className="col-12 col-lg-8">
            <div className="heading__titlecart">
              <h2>{i18n.t("cart.title")}</h2>
              <br></br>
              <h3>{i18n.t("cart.continue")} <Link href="/[lng]/products" as={`/${lng}/products`}>
              <a className="heading__titlecart--colorLink">
                {i18n.t("cart.Toproduct")}
              </a>
            </Link>
            </h3>
            </div>
              {invalidMsg !== "" &&
                <div className="cart-table__errorCart">
                  {invalidMsg}
                </div>
              }
              <CartDetails
                currency="IDR"
                imageHeaderText={i18n.t("cart.item")}
                nameHeaderText={i18n.t("cart.product")}
                classes={classesCartDetails}
                withSeparatedVariant={true}
                itemRedirectPathPrefix={`product`}
                getSKU={(SKUs) => setSKUs(SKUs)}
                isEditable={false}
                onErrorMsg={(msg) => toast.error(msg)}
                onInvalidMsg={(msg) => setInvalidMsg(msg)}
                editIcon={<FontAwesomeIcon icon={faEdit} height="1em" />}
                removeIcon={<FontAwesomeIcon icon={faTrash} height="1em" />}
                thumborSetting={{
                  width: size.width < 768 ? 200 : 150,
                  format: "webp",
                  quality: 85,
                }}
                emptyCartPlaceHolder={
                  <EmptyComponent
                    classes={classesEmptyComponent}
                    logo={
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        className="cart-table__empty--icon"
                      />
                    }
                    title={i18n.t("cart.isEmpty")}
                    desc={i18n.t("cart.isEmptyDesc")}
                  />
                }
              />
            </div>
            <div className="col-12 col-lg-4 no-padding-mobile-pad">
              <OrderSummaryBox
                i18n={i18n}
                auth={auth}
                page="cart"
              />
            </div>
          </div>
          {allowedProductRecommendation && pageInfo.totalItems !== 0 && SKUs !== null &&
            <>
              <hr className="hr-page" />
              <div className="heading">
                <div className="heading__title">
                  <h5>{i18n.t("product.relatedProduct")}</h5>
                </div>
              </div>
              <div className="row">
                <LazyLoadComponent>
                  <Products
                    SKUs={SKUs}
                    getCrossSellPageInfo={(pageInfo: any) => setPageInfo({ totalItems: pageInfo.totalItems })}
                    classes={classesProducts}
                    paginationClasses={paginationClasses}
                    itemPerPage={size.width < 768 ? 2 : 4}
                    newPagination
                    pathPrefix="product"
                    lazyLoadedImage={false}
                    thumborSetting={{
                      width: size.width < 768 ? 350 : 600,
                      format: "webp",
                      quality: 85
                    }}
                    loadingComponent={
                      <>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder classes={classesPlaceholderProduct} withImage />
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder classes={classesPlaceholderProduct} withImage />
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder classes={classesPlaceholderProduct} withImage />
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder classes={classesPlaceholderProduct} withImage />
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                          <Placeholder classes={classesPlaceholderProduct} withImage />
                        </div>
                      </>
                    }
                  />
                </LazyLoadComponent>
              </div>
            </>
          }
          
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const cookies = parseCookies(req);
  const auth = cookies.AUTH_KEY;
  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      auth: auth || null,
      brand: brand || ''
    },
  };
};
export default Cart;
