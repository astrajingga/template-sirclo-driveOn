import { FC } from "react";
import Rating from "./Rating";
import ProgressBar from "./ProgressBar";

const RatingReview: FC<any> = () => {
  const ratings = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 50,
    '5': 80
  }

  const ListRatingProgress = (ratings) => {
    let lists = [];
    for (let i = 5; i >= 1; i--) {
      lists.push(
        <div className="reviews__ratings--slide-items">
          <Rating rating={1} starMany={1} />
          <span>{i}</span>
          <ProgressBar rating={ratings[i]} />
        </div>
      )
    }
    return lists;
  }

  return (
    <div className="reviews__ratings">
      <div className="reviews__ratings--detail">
        <h2 className="reviews__ratings--detail-point">4.8</h2>
        <Rating rating={4} starMany={5} />
        <p className="reviews__ratings--detail-total">54 Reviews</p>
      </div>
      <div className="reviews__ratings--slide">
        {ListRatingProgress(ratings)}
      </div>
    </div>
  )
}

export default RatingReview;