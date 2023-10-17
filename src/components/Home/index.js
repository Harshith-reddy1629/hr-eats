import { Component } from "react";
import Cookies from "js-cookie";
import { RotatingLines } from "react-loader-spinner";
import "./index.css";

import Offers from "../Offers";
import RestaurantItem from "../RestaurantItem";
import Header from "../Header";

const pageStatus = {
  inProgress: "LOADING",
  success: "SUCCESS",
  failed: "FAILURE",
};

class Home extends Component {
  state = { status: pageStatus.inProgress, restaurantsData: [] };

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
      const response = await fetch(
        "https://apis.ccbp.in/restaurants-list?offset=0&limit=60",
        options
      );
      // 'https://apis.ccbp.in/restaurants-list/${restrauntId}'
      const result = await response.json();
      const Data = result.restaurants.map((each) => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        id: each.id,
        hasTableBooking: each.has_table_booking,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews,
        },
      }));
      if (response.ok) {
        this.setState({ status: pageStatus.success, restaurantsData: Data });
      } else {
        console.log("er");
      }
    } catch (error) {
      console.log(error);
    }
  };

  viewOfStatus = () => {
    const { restaurantsData, status } = this.state;
    switch (status) {
      case pageStatus.inProgress:
        return (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        );
      case pageStatus.success:
        return (
          restaurantsData.length !== 0 &&
          restaurantsData.map((each) => (
            <RestaurantItem key={each.id} item={each} />
          ))
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="home">
        <Header />
        <Offers />
        <div className="popular-container">
          <h1 className="popular-text">Popular Restaurants</h1>
          <p
            className="popular-desc"
            style={{ fontSize: "13px", color: "#555" }}
          >
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <ul className="restaurant-list">{this.viewOfStatus()}</ul>
      </div>
    );
  }
}

export default Home;
