import { useState, useEffect } from "react";
import Link from "next/link";

const lang = {
  en: {
    title: "Page not found",
    desc: "The link you are following may be broken, or the page has been deleted",
    back: "Back"
  },
  id: {
    title: "Halaman tidak ditemukan",
    desc: "Tautan yang anda ikuti mungkin rusak, atau halaman telah di hapus",
    back: "Kembali"
  }
}

const Error404Page: React.FC<any> = () => {
  const [lng, setLang] = useState<string>("en")

  useEffect(() => {
    const allowedLang = ['id', 'en'];
    const activeLang =
      (allowedLang.indexOf(window.location.pathname.substring(1, 3)) == -1)
        ? 'id'
        : window.location.pathname.substring(1, 3);

    setLang(activeLang)
  }, [])

  return (
    <div className="error-pages">
      <div className="error-pages__container">
        <img src="/images/merlin-404.svg" className="error-pages__container--icon" alt="merlin" />
        <h2 className="error-pages__container--title">{lng && lang[lng].title}</h2>
        <p className="error-pages__container--desc">{lng && lang[lng].desc}</p>
        <Link href="/" as="/">
          <a className="btn btn-orange btn-long">{lng && lang[lng].back}</a>
        </Link>
      </div>
    </div>
  )
}

export default Error404Page;