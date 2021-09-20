import { FC, useState } from "react";
import { InstagramFeed as InstaFeed } from "@sirclo/nexus";
import Carousel from "@brainhubeu/react-carousel";
import dynamic from "next/dynamic";
import {
  useI18n,
} from "@sirclo/nexus";

const Placeholder = dynamic(() => import("components/Placeholder"));
const InstagramQuickView = dynamic(() =>
  import("@sirclo/nexus").then((mod) => mod.InstagramQuickView)
);

const classesInstagramQuickView = {
  quickViewBackgroundClassName: "instagramFeed_quickviewBackground",
  quickViewContentClassName: "instagramFeed_quickviewInner",
  closeButtonClassName: "btn instagramFeed_quickviewButton",
  quickViewAnchorClassName: "instagramFeed_quickviewLink",
  quickViewMediaClassName: "instagramFeed_quickviewImage"
}

const classesInstagramFeed = {
  containerClassName: "instagramFeed",
  mediaClassName: "instagramFeed_media",
  anchorClassName: "instagramFeed_mediaLink",
  imageClassName: "instagramFeed_mediaImage"
}

const classesPlaceholderInstafeed = {
  placeholderImage: "placeholder-item placeholder-item__instagramfeed"
}

type TSize = {
  width: Number
}

const InstagramFeed: FC<{size: TSize}> = ({ size }) => {
  const [instagramQuickView, setInstagramQuickView] = useState<boolean>(false);
  const [instagramMedia, setInstagramMedia] = useState<any>({});

  const i18n: any = useI18n();
  
  return (
    
    <div className="container">
        <div className="heading">
          <div className="heading__title">
            <h6>{i18n.t("instaFeed.titleDesc")}</h6>
            <h1>{i18n.t("instaFeed.title")}</h1>
          </div>
        </div>
      {(instagramQuickView && instagramMedia) &&
        <InstagramQuickView
          classes={classesInstagramQuickView}
          showQuickView={setInstagramQuickView}
          media={instagramMedia}
          thumborSetting={{
            width: size.width < 575 ? 350 : 500,
            format: 'webp',
            quality: 85,
          }}
        />
      }

      <InstaFeed
        Carousel={Carousel}
        slidesPerPage={size.width < 575 ? 4 : 6}
        slidesPerScroll={1}
        autoPlay={10000}
        infinite
        classes={classesInstagramFeed}
        withQuickview
        showQuickView={setInstagramQuickView}
        getQuickViewMedia={setInstagramMedia}
        loadingComponent={
          <Placeholder classes={classesPlaceholderInstafeed} withImage />
        }
        thumborSetting={{
          width: size.width < 575 ? 250 : 400,
          format: 'webp',
          quality: 85,
        }}
      />
    </div>
  )
}

export default InstagramFeed