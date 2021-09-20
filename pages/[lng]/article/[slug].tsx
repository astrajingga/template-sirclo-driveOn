import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Article, useI18n } from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { useBrand } from "lib/utils/useBrand";

const Information: FC<any> = ({
	lng,
	lngDict,
	slug,
	brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const i18n: any = useI18n();
	const [title, setTitle] = useState<string>("");
	const linksBreadcrumb = [`${i18n.t("home.title")}`, `${title}`]

	return (
		<Layout
			lngDict={lngDict}
			i18n={i18n}
			lng={lng}
			brand={brand}
		>
			<Breadcrumb title={title} links={linksBreadcrumb} lng={lng} />
			<section>
				<div className="container">
					<div className="information">
						<Article
							containerClassName="information__content"
							slug={slug as string}
							getTitle={setTitle}
						/>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
	const { default: lngDict = {} } = await import(
		`locales/${params.lng}.json`
	);

	const brand = await useBrand(req);

	return {
		props: {
			lng: params.lng,
			lngDict,
			slug: params.slug,
			brand: brand || ''
		},
	};
}

export default Information;
