import { Link } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";

import "./index.css";

const RestaurantItem = (props) => {
  const { item } = props;

  const { id, imageUrl, name, cuisine, userRating, location } = item;

  const { rating, ratingColor, totalReviews } = userRating;

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{
        background: `linear-gradient( to right, #333333cc,#33333390)  ,url(${imageUrl})`,
        backgroundSize: "100%",
      }}
      className="restaurant-item"
    >
      <img src={imageUrl} className="restaurant-img" alt="item" />
      <div>
        <h3 className="restaurant-name">{name}</h3>
        <p className="restaurant-type">{cuisine}</p>
        <p
          className="restaurant-rating"
          style={{
            margin: "6px 0 0 0 ",
            color: `#${ratingColor}`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AiFillStar color="goldenrod" size={18} />
          {rating}{" "}
          <span style={{ color: "#fff", marginLeft: "6px" }}>
            ({totalReviews})
          </span>
        </p>
        <p className="address">{location}</p>
      </div>
    </Link>
  );
};

export default RestaurantItem;
