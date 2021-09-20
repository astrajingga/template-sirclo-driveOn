import { FC } from 'react';

export type RatingPropsType = {
  rating: number;
  starMany: number;
}

const Rating: FC<RatingPropsType> = ({
  rating,
  starMany
}: RatingPropsType) => {
  let stars = [];
  for (var i = 1; i <= starMany; i++) {
    let classesStar = "reviews-stars__item";

    if (rating >= i && rating !== null) {
      classesStar += " is-selected";
    }

    stars.push(
      <label key={i} className={classesStar}>★</label>
    );
  }

  return (
    <div className="reviews-stars">
      {stars}
    </div>
  )
}

export default Rating;