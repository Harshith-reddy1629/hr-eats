import { Component } from "react";

import { AiFillStar } from "react-icons/ai";

import { BsCurrencyRupee } from "react-icons/bs";

// import { matchRoutes, matchPath } from "react-router-dom";

import Cookies from "js-cookie";
import Header from "../Header";

import "./index.css";
import FoodItem from "../FoodItem";

class RestaurantDetails extends Component {
  state = { restaurantDetails: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        AuthoriZation: `Bearer ${jwtToken}`,
      },
    };

    try {
      const { id } = this.props;
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list/${id}`,

        options
      );
      const result = await response.json();
      console.log(result);
      const Data = {
        costForTwo: result.cost_for_two,
        cuisine: result.cuisine,
        foodItems: result.food_items.map((each) => ({
          cost: each.cost,
          foodType: each.food_type,
          imageUrl: each.image_url,
          itemRating: each.rating,
          itemId: each.id,
          name: each.name,
        })),

        id: result.id,

        imageUrl: result.image_url,

        location: result.location,

        name: result.name,
        opensAt: result.opens_at,
        itemsCount: result.items_count,
        rating: result.rating,

        totalReviews: result.reviews_count,
      };
      if (response.ok) {
        this.setState({ restaurantDetails: Data });
      } else {
        console.log("er");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { restaurantDetails } = this.state;
    console.log(restaurantDetails);
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      totalReviews,
      costForTwo,
    } = restaurantDetails;
    return (
      <div className="re">
        <Header />
        <div
          style={{
            background: `linear-gradient( to right, #222222dd,#22222299)  ,url(${imageUrl})`,
          }}
          className="restaurant-banner"
        >
          <img
            className="restaurant-page-image"
            src={imageUrl}
            alt="restaurant"
          />
          <div>
            <h1 className="restaurant-name-page">{name}</h1>
            <p className="restaurant-desc-page">{cuisine}</p>
            <p className="restaurant-desc-page">{location}</p>
            <div className="ratings-container">
              <div className="rating-container">
                <p className="rating-text">
                  <AiFillStar />
                  {rating}
                </p>
                <p className="rating-text">{totalReviews} Ratings</p>
              </div>
              <hr />
              <div className="rating-container">
                <p className="rating-text">
                  <BsCurrencyRupee />
                  {costForTwo}
                </p>
                <p className="rating-text">Cost for Two</p>
              </div>
            </div>
          </div>
        </div>
        <ul
          style={{
            all: "unset",
            listStyleType: "none",
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          {restaurantDetails.length !== 0 &&
            restaurantDetails.foodItems.map((each) => (
              <FoodItem key={each.itemId} each={each} />
            ))}
        </ul>
      </div>
    );
  }
}

export default RestaurantDetails;
