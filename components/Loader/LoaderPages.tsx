import { FC } from "react"
import { useI18n } from "@sirclo/nexus"

type TypeLoaderPage = {
  otherClassNameInner?: string
}

const LoaderPages: FC<any> = ({
  otherClassNameInner
}: TypeLoaderPage) => {
  const i18n: any = useI18n();

  return (
    <div className="loader-pages">
      <div className="loader-pages__container">
        <div className={`loader-pages__inner ${otherClassNameInner}`}>
          <img src="/images/merlin-loader.svg" className="loader-pages__inner--icon" alt="merlin" />
          <p className="loader-pages__inner--label">{i18n.t("home.loading")}</p>
        </div>
      </div>
    </div>
  )
}

export default LoaderPages;