import { QuickDetail } from "@sirclo/nexus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";

export type QuickdetailPropsType = {
  slug: string,
  setSlug: any,
  setIsQuickDetail: any,
}

const classesQuickDetail = {
  containerClassName: "quickdetail__inner",
  detailClassName: "row quickdetail__inner--container",
  imageContainerClassName: "col-4 quickdetail__inner--left",
  mainImageClassName: "quickdetail__inner--left-image",
  innerDetailClassName: "col-8 quickdetail__inner--right",
  detailTitleClassName: "quickdetail__inner--right-title",
  qtyBoxClassName: "quickdetail__inner--right-qty",
  variantContainerClassName: "row quickdetail__inner--variant",
  variantOptionsContainerClassName: "col-6 quickdetail__inner--variant-container",
  variantLabelClassName: "quickdetail__inner--variant-label",
  variantOptionsClassName: "quickdetail__inner--variant-select",
  buttonsContainerClassName: "quickdetail__inner--footer",
  viewDetailsBtnClassName: "btn quickdetail__inner--footer-detail",
  updateCartBtnClassName: "btn btn-orange quickdetail__inner--footer-update",
  salePriceClassName: "products__item--content-price--sale"
}

const QuickdetailComponent: React.FC<QuickdetailPropsType> = ({ slug, setSlug, setIsQuickDetail }) => {
  return (
    <div className="quickdetail__overlay">
      <div className="quickdetail__container">
        <span className="close-button" onClick={() => setIsQuickDetail(false)}>
          <FontAwesomeIcon icon={faTimes} className="close-icon" />
        </span>
        <QuickDetail
          slug={slug}
          withDelay
          onError={(err) => console.log(err)}
          onUpdateCompleted={(_) => setSlug("")}
          classes={classesQuickDetail}
          loadingComponent={
            <div className="mx-auto loader">
              <Loader color="text-dark" />
            </div>
          }
          thumborSetting={{
            width: 181,
            format: "webp",
            quality: 85,
          }}
        />
      </div>
    </div>
  )
}

export default QuickdetailComponent;