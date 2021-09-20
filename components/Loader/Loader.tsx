import { useI18n } from "@sirclo/nexus"

const Loader = ({ color }) => {
  const i18n: any = useI18n();

  return (
    <>
      <span className={`spinner-border spinner-border-sm ${color}`} role="status"></span>
      <span className="ml-2">{i18n.t("loader.loading")}</span>
    </>
  )
}

export default Loader;