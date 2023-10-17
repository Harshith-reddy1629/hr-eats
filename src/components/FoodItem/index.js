import { AiFillStar } from "react-icons/ai";
import { BiFoodTag } from "react-icons/bi";
import { BsCurrencyRupee } from "react-icons/bs";

const FoodItem = (props) => {
  const { each } = props;
  return (
    <li className="food-item-card">
      <img src={each.imageUrl} alt="item" className="food-img" />
      <div>
        <h3 className="food-heading" style={{ margin: "0" }}>
          {each.name}{" "}
          <BiFoodTag color={each.foodType === "VEG" ? "green" : "red"} />
        </h3>
        <p className="food-cost" style={{ margin: "0" }}>
          <BsCurrencyRupee /> {each.cost}
        </p>
        <p className="rating-text food-rating">
          <AiFillStar />
          {each.itemRating}
        </p>
      </div>
    </li>
  );
};

export default FoodItem;
