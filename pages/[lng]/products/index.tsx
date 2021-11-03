/* library Package */ 
import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  Products,
  ProductFilter,
  ProductCategory,
  useI18n,
} from '@sirclo/nexus'
import { Sliders, ArrowUp } from 'react-feather'

/* library Template */
import useQuery from 'lib/utils/useQuery'
import useWindowSize from 'lib/utils/useWindowSize'
import convertToTextFromQuery from 'lib/utils/convertToTextFromQuery'
import { useBrand } from 'lib/utils/useBrand'

/* component*/
import SEO from 'components/SEO/SEO'
import Layout from 'components/Layout/Layout'
import EmptyComponent from 'components/EmptyComponent/EmptyComponentUNO'
import Placeholder from 'components/Placeholder'
import Popup from 'components/Popup/PopupUno'

/* styles */
import styles from 'public/scss/pages/Products.module.scss'

const classesPagination = {
  pagingClassName: "col-12 products__pagination",
  itemClassName: "products__paginationItem",
  activeClassName: "products__paginationItemActive"
}

const classesProducts = {
  productContainerClassName: "col-6 col-md-4 products__item",
  productImageClassName: "products__item--image",
  productImageContainerClassName: "image-container",
  productLabelContainerClassName: "products__item--content",
  productTitleClassName: "products__item--content-title",
  productPriceClassName: "products__item--content-price",
  stickerContainerClassName: "products__item-sticker",
  outOfStockLabelClassName: "products__item-sticker--outofstock",
  saleLabelClassName: "products__item-sticker--sale",
  preOrderLabelClassName: "products__item-sticker--preorder",
  newLabelClassName: "products__item-sticker--new",
  buttonClassName: "products__item--buttonQuickview",
  salePriceClassName: "products__item--content-price--sale",
};

const classesProductSort = {
  sortClassName: `form-group ${styles.sirclo_form_select}`,
  sortOptionsClassName: `form-control ${styles.sirclo_form_input}`,
  sortOptionClassName: 'opsi',
  sortActiveClassName: 'opsi-selected',
};

const classesProductFilterSort = {
  filterClassName: styles.products_filter,
  filterNameClassName: styles.products_filterName,
  filterOptionPriceClassName: styles.products_filterPrice,
  filterPriceLabelClassName: styles.products_filterPriceLabel,
  filterPriceInputClassName: styles.products_filterPriceInput,
  filterOptionClassName: styles.products_filterOption,
  filterColorLabelClassName: styles.products_filterOptionLabel,
  filterLabelClassName: styles.products_filterOptionLabel,
  filterCheckboxClassName: styles.products_filterOptionCheckbox,
  filterSliderClassName: styles.products_filterSlider,
  filterSliderRailClassName: styles.products_filterSliderRail,
  filterSliderHandleClassName: styles.products_filterSliderHandle,
  filterSliderTrackClassName: styles.products_filterSliderTrack,
  filterSliderTooltipClassName: styles.products_filterSliderTooltip,
  filterSliderTooltipContainerClassName: styles.products_filterSliderTooltipContainer,
  filterSliderTooltipTextClassName: styles.products_filterSliderTooltipText,
};

const classesProductCategory = {
  parentCategoryClassName: styles.category_order,
  categoryItemClassName: styles.category_list,
  categoryValueClassName: styles.category_list_link,
  categoryNameClassName: styles.category_list_item,
  categoryNumberClassName: "ml-1",
  dropdownIconClassName: "d-none",
};

const classesEmptyComponent = {
  emptyContainer: styles.products_empty,
  emptyTitle: styles.products_empty_title,
  emptyDesc: styles.products_empty_desc,
};

const classesPlaceholderCatProduct = {
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_productCat__title}`,
};

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__card}`,
};

const ProductsPage: FC<object> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const i18n: any = useI18n();
  const size = useWindowSize();
  const categories: string = useQuery("categories");
  const tagname: string | string[] = router.query.tagname || null;

  const [openSort, setOpenSort] = useState<boolean>(false);
  const [sort, setSort] = useState(null);
  const [filterProduct, setFilterProduct] = useState({});

  const [currPage, setCurrPage] = useState<number>(0);

  useEffect(() => {
    setCurrPage(0);
  }, [filterProduct, categories]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toogleSort = () => setOpenSort(!openSort);
  const handleFilter = (selectedFilter: any) => {
    setFilterProduct(selectedFilter);
  }

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <SEO title={i18n.t("product.products")} />
      <div className={styles.category}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <ProductCategory
                classes={classesProductCategory}
                showCategoryNumber={false}
                loadingComponent={
                  <div className="container">
                    <div className="row">
                      <div className="col-4 col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="col-4 col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="col-4 col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="d-none d-md-block col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="d-none d-md-block col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="d-none d-md-block col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${styles.products}`}>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className={styles.products_header}>
              <h3 className="text-capitalize">
                {categories
                  ? convertToTextFromQuery(categories)
                  : i18n.t("product.all")}
              </h3>
            </div>
            <div className="row">
              {Array.from(Array(currPage + 1)).map((_, i) => (
                <Products
                  key={i}
                  tagName={tagname}
                  pageNumber={i}
                  itemPerPage={6}
                  collectionSlug={categories}
                  sort={sort}
                  callPagination={true}
                  paginationClasses={classesPagination}
                  filter={filterProduct}
                  withSeparatedVariant={true}
                  classes={classesProducts}
                  fullPath={`product/{id}`}
                  pathPrefix={`product`}
                  lazyLoadedImage={false}
                  thumborSetting={{
                    width: size.width < 768 ? 512 : 800,
                    format: "webp",
                    quality: 85,
                  }}
                  emptyStateComponent={
                    <div className="col-12">
                      <EmptyComponent
                        classes={classesEmptyComponent}
                        title={i18n.t("product.isEmpty")}
                        button={
                          <button
                            className={`btn mt-2 ${styles.btn_primary} ${styles.btn_long}`}
                            onClick={() =>
                              router.push(`/[lng]/products`, `/${lng}/products`)
                            }
                          >
                            {i18n.t("product.back")}
                          </button>
                        }
                      />
                    </div>
                  }
                  loadingComponent={
                    <>
                      <div className="col-6 col-md-4 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="col-6 col-md-4 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="d-none d-md-block col-md-4 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="d-none d-md-block col-md-4 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="d-none d-md-block col-md-4 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="d-none d-md-block col-md-4 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                    </>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.products_action}>
        <div
          className={`${styles.products_action_sort} mr-2`}
          onClick={toogleSort}
        >
          <span className="mr-2">
            <Sliders color="white" />
          </span>
          <span className={styles.products_action_sort__title}>
            {i18n.t("product.adjust")}
          </span>
        </div>
        <div className={styles.products_action_top} onClick={() => scrollTop()}>
          <span>
            <ArrowUp color="white" />
          </span>
        </div>
      </div>
      {openSort && (
        <Popup
          withHeader
          setPopup={toogleSort}
          popupTitle={i18n.t("product.adjust")}
        >
          <div className={styles.products_sortLabel}>
            {i18n.t("product.sort")}
          </div>
          <ProductFilter
            withSort
            sortType="dropdown"
            sortClasses={classesProductSort}
            classes={classesProductFilterSort}
            withPriceMinimumSlider
            withPriceValueLabel
            withPriceInput
            withTooltip
            handleFilter={handleFilter}
            handleSort={(selectedSort: any) => {
              setSort(selectedSort);
              setOpenSort(false);
            }}
          />
        </Popup>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const brand = await useBrand(req);
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id';
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`);

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ""
    }
  };
};

export default ProductsPage;
