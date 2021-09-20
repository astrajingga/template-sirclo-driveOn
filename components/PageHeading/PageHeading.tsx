export type PageHeadingPropsType = {
  title: string
  topLink: string
  topLinkText: string
  button: boolean
  redirectTo: (link: string) => void
}

function PageHeading({
  title,
  topLink,
  topLinkText,
  button,
  redirectTo,
}: PageHeadingPropsType) {
  return (
    <div className="heading">
      <div className="text-center">
        {button ? (
          <p className="back-button" onClick={() => redirectTo(topLink)}>
            <i className="fas fa-angle-left"></i> {topLinkText}
          </p>
        ) : null}
        <h3 style={{ fontWeight: 600 }}>{title}</h3>
      </div>
    </div>
  )
}

export default PageHeading
