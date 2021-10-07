import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import {
  useI18n,
  Blogs,
  BlogCategories,
  getBlogHeaderImage,
  BlogRecent,
  isBlogAllowed
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useWindowSize from "lib/utils/useWindowSize";
import { GRAPHQL_URI } from "lib/Constants";
import { useBrand } from "lib/utils/useBrand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import styles from "public/scss/pages/Blog.module.scss";

const EmptyComponent = dynamic(() => import("components/EmptyComponent/EmptyComponent"));
const Placeholder = dynamic(() => import("components/Placeholder"));

const classesBlogs = {
  blogsContainerClassName: "row blogs-page",
  blogContainerClassName: "col-12 col-md-12 blogs-page__items row",
  categoryClassName: "blogs-page__items--category",
  imageContainerClassName: "blogs-page__items--container col-12 col-md-4",
  imageClassName: "blogs-page__items--container-image",
  contentContainerClassName: "blogs-page__items--contentContainer",
  descriptionClassName: "blogs-page__items--container col-12 col-md-8 ",
  titleClassName: "blogs-page__items--container-title",
  descriptionFooterClassName: "blogs-page__items--container-details",
  authorPicClassName: "d-none",
  descriptionInnerFooterClassName: "blogs-page__items--container-details-author",
  authorClassName: "blogs-page__items--container-details-author-title",
  dateClassName: "blogs-page__items--container-details-author-date"
}

const classesBlogCategories = {
  containerClassName: "blogs-category",
  categoryClassName: "blogs-category__items ",
  linkClassName: "blogs-category__items--link",
}

const classesEmptyComponent = {
  emptyContainer: "blogs-page__empty",
  emptyTitle: "blogs-page__empty--title",
  emptyDesc: "blogs-page__empty--desc",
};

const classesPagination = {
  pagingClassName: "col-12 blogs-page__pagination",
  itemClassName: "blogs-page__paginationItem",
  activeClassName: "blogs-page__paginationItemActive"
}

const classesPlaceholderBlogs = {
  placeholderImage: "placeholder-item placeholder-item__blogsList"
}

const classesBlogRecent = {
  containerClassName: "recent-post",
  blogRecentClassName: "recent-post__items",
  imageClassName: "recent-post__items--image",
  labelContainerClassName: "recent-post__items--label",
  titleClassName: "recent-post__items--label-title",
  dateClassName: "recent-post__items--label-date",
}

const Blog: FC<any> = ({
  lng,
  lngDict,
  headerImage,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();
  const allowedBlog = isBlogAllowed();

  const [totalCategories, setTotalCategories] = useState(null);
  console.log(headerImage)

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("blog.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      {allowedBlog &&
        <>
          <Breadcrumb
            // title={i18n.t("blog.title")}
            links={linksBreadcrumb}
            lng={lng}
          />
          <div className="container">
            <div
              className={`${styles.blog_headerContainer} ${!headerImage && styles.blog_headerWithoutBackground}`}
              style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerImage})` }}
            >
              <h1 className={styles.blog_headerTitle}>
                {i18n.t("blog.title")}
              </h1>
            </div>
            <br></br>
            <div className="row">
              <div className="col-12 col-lg-9">
                <Blogs
                  classes={classesBlogs}
                  paginationClasses={classesPagination}
                  withPagination
                  itemPerPage={4}
                  withReadMoreButton
                  thumborSetting={{
                    width: size.width < 768 ? 375 : 512,
                    format: "webp",
                    quality: 85,
                  }}
                  LoadingComponent={
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <Placeholder classes={classesPlaceholderBlogs} withImage />
                      </div>
                      <div className="col-12 col-md-6">
                        <Placeholder classes={classesPlaceholderBlogs} withImage />
                      </div>
                    </div>
                  }
                  emptyStateComponent={
                    <EmptyComponent
                      classes={classesEmptyComponent}
                      title={i18n.t("blog.isEmpty")}
                      logo={
                        <FontAwesomeIcon
                          icon={faNewspaper}
                          className="blogs-page__empty--icon"
                        />
                      }
                    />
                  }
                />
              </div>
              <div className="col-12 col-lg-3">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-12">
                    {(totalCategories > 0 || totalCategories === null) &&
                      <>
                        <h1 className="title-side-blogs">
                          {i18n.t("blog.categories")}
                        </h1>
                        <BlogCategories
                          classes={classesBlogCategories}
                          getCategoriesCount={(categoriesCount) => setTotalCategories(categoriesCount)}
                        />
                      </>
                    }
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                    <h2 className="title-side-blogs">{i18n.t("blog.recentPost")}</h2>
                    <BlogRecent
                      classes={classesBlogRecent}
                      limit={5}
                      linkPrefix="blog"
                      thumborSetting={{
                        width: 100,
                        format: "webp",
                        quality: 85
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);
  const headerImage = await getBlogHeaderImage(GRAPHQL_URI(req));

  return {
    props: {
      lng: params.lng,
      lngDict,
      headerImage,
      brand: brand || ''
    },
  };
}

export default Blog;