import { FC } from "react";

export type EmptyComponentPropsType = {
  classes: {
    emptyContainer?: string;
    emptyTitle?: string;
    emptyDesc?: string;
  };
  logo?: any;
  title: string;
  desc?: string;
};

const EmptyComponent: FC<EmptyComponentPropsType> = ({
  classes = {},
  logo,
  title,
  desc
}) => {
  const {
    emptyContainer = "empty-emptyContainer",
    emptyTitle = "empty-emptyTitle",
    emptyDesc = "empty-emptyDesc"
  } = classes;

  return (
    <div className={emptyContainer}>
      {logo}
      <h2 className={emptyTitle}>{title}</h2>
      <p className={emptyDesc}>{desc}</p>
    </div>
  )
}

export default EmptyComponent;