import { Component } from "react";

import Cookies from "js-cookie";

import OffersCarousel from "../OffersCarousel";

import { RotatingLines } from "react-loader-spinner";

const pageStatus = {
  inProgress: "LOADING",
  success: "SUCCESS",
  failed: "FAILURE",
};

class Offers extends Component {
  state = { status: pageStatus.inProgress, imagesData: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const requiredUrl = "https://apis.ccbp.in/restaurants-list/offers";

    const options = {
      method: "GET",
      headers: {
        AuthoriZation: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(requiredUrl, options);
      const data = await response.json();
      if (response.ok) {
        this.setState({ status: pageStatus.success, imagesData: data.offers });
      } else {
        console.log("er");
      }
    } catch (error) {
      console.log(error);
    }
  };

  re = () => {
    const { imagesData, status } = this.state;
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
          <div className="carousal-div">
            <OffersCarousel imagesData={imagesData} />
          </div>
        );

      default:
        return null;
    }
  };

  render() {
    return <div className="Carousal-container">{this.re()}</div>;
  }
}

export default Offers;
