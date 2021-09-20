import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useWindowSize from "lib/utils/useWindowSize";
import { useRouter } from "next/router";
import { useBrand } from "lib/utils/useBrand";
import Layout from "components/Layout/Layout";
import {
  OrderReview,
  useI18n,
} from "@sirclo/nexus";

const classesOrderReview = {
  titleContainerClassName: "d-none",
  orderInfoContainerClassName: "orderReview-orderInfo",
  orderInfoLineClassName: "orderReview-orderInfoLine",
  buyerInfoContainerClassName: "orderReview-buyerInfo",
  buyerNameLabelClassName: "orderReview-buyerNameLabel",
  buyerNameClassname: "form-control sirclo_form_input size_label",
  buyerHideNameContainerClassName: "orderReview-buyerHide",
  reviewTabContainerClassName: "orderReview-reviewTab",
  needsReviewTabContainerClassName: "orderReview-tabItem",
  reviewedTabContainerClassName: "orderReview-tabItem",
  activeTabClassName: "orderReview-activeTab",
  needsReviewTabLabelClassName: "orderReview-tabLabel",
  reviewedTabLabelClassName: "orderReview-tabLabel",
  productInfoContainerClassName: "orderReview-productInfo",
  productImageClassName: "orderReview-productImage",
  productDetailContainerClassName: "orderReview-productDetail",
  productNameClassName: "orderReview-productDetailName",
  yourRatingTextClassName: "orderReview-productDetailRating",
  productReviewButtonContainerClassName: "orderReview-productButton",
  writeReviewButtonClassName: `btn btn-danger`,
  itemPerPageClassName: "orderReview-itemPerPage",
  itemPerPageOptionsClassName: "orderReview-itemPerPageOptions",
  formContainerClassName: "orderReview-form",
  formGroupClassName: "orderReview-formGroup",
  formLabelClassName: "orderReview-formLabel",
  starContainerClassName: "orderReview-starContainer",
  starClassName: "orderReview-star",
  containerClassName: "orderReview-media",
  imagesContainerClassName: "orderReview-mediaImages",
  mediaContainerClassName: "orderReview-mediaThumbnail",
  imgClassName: "orderReview-mediaImage",
  mediaRemoverClassName: "orderReview-mediaRemove",
  imgUploadClassName: "orderReview-mediaUpload",
  popupConfirmationSubmitContainerClassName: "orderReview_popup",
  popupConfirmationSubmitContentClassName: "orderReview-popupContent",
  popupConfirmationSubmitTitleClassName: "orderReview-popupTitle",
  popupConfirmationSubmitDescriptionClassName: "orderReview-popupDesc",
  popupConfirmationSubmitWrapButtonClassName: "orderReview-popupActionButton",
  openReviewButtonClassName: `btn`,
  reviewCardContainerClassName: "orderReview-reviewCard",
  tileRatingClassName: "orderReview-reviewCardtitleRating",
  ratingContentClassName: "orderReview-ratingContent",
  ratingDescriptionClassName: "orderReview-ratingDesc",
  titleDescriptionClassName: "orderReview-titleDesc",
  descriptionContentClassName: "orderReview-descContent",
  titleImageClassName: "orderReview-titleImages",
  imageContentClassName: "orderReview-imageContent",
  imageListClassName: "orderReview-imageList",
  uploadIconClassName: "orderReview-mediaUploadIcon",

  pagingClassName: "orderReview-pagination-order",
  itemClassName: "orderReview-pagination-order-list",
  activeClassName: "active",
  linkClassName: "orderReview-pagination-order-list-link",
}

const ReviewPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  const { id } = router.query;
  const size = useWindowSize();

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("orderReview.title")}`,
  ];

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb
        title={i18n.t("orderReview.title")}
        links={linksBreadcrumb}
        lng={lng}
      />
      <section>
        <div className="container">
          <div className="orderReview">
            <OrderReview
              classes={classesOrderReview}
              orderID={id as string}
              itemPerPageOptions={[5, 10, 15]}
              arrowIconDown={<FontAwesomeIcon color="black" icon={faChevronDown} />}
              arrowIconUp={<FontAwesomeIcon color="black" icon={faChevronUp} />}
              onSuccessMsg={(msg) => toast.success(msg)}
              onErrorMsg={(msg) => toast.error(msg)}
              thumborSetting={{
                width: size.width < 768 ? 375 : 500,
                format: "webp",
                quality: 85,
              }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    },
  };
};

export default ReviewPage;
