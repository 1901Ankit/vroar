import React from "react";
import ReactStars from "react-rating-stars-component";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
const Rating = (props) => {
  return (
    <div className="text-center">
      <ReactStars
        count={5}
        size={20}
        isHalf={true}
        emptyIcon={<BsStar />}
        halfIcon={<BsStarHalf />}
        filledIcon={<BsStarFill />}
        edit={props.isEditable}
        value={props.value}
        onChange = {props.handleRatingChange}
      />
    </div>
  );
};

export default Rating;
