import { useEffect, useState } from "react";

type TPageInfo = {
  pageNumber: number,
  itemPerPage: number,
  totalItems: number
}

const useInfiniteScroll = (pageInfo: TPageInfo, itemClass: string) => {
  const [currPage, setCurrPage] = useState(0)
  const totalPage = Math.ceil(pageInfo.totalItems / pageInfo.itemPerPage)

  const handleScroll = () => {
    const lastElement = document.querySelector(
      `.${itemClass}:last-child`
    ) as HTMLElement

    if (lastElement) {
      const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight

      if (pageOffset > lastElementOffset && currPage < totalPage - 1)
        setCurrPage(currPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  return { currPage, setCurrPage }
}

export default useInfiniteScroll