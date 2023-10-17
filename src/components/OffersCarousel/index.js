import { Component } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

class OffersCarousel extends Component {
  S = () => "";
  render() {
    const { imagesData } = this.props;
    return (
      <Carousel
        // centerMode
        // centerSlidePercentage={90}
        autoPlay
        autoFocus
        useKeyboardArrows
        swipeable
        // onSwipeStart
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        // showArrows={false}
        showThumbs={false}
        // statusFormatter={this.S}
      >
        {imagesData.map((each) => (
          <div key={each.id} className="carousal-div">
            <img style={{ height: "100%" }} src={each.image_url} alt="i" />
          </div>
        ))}
      </Carousel>
    );
  }
}

export default OffersCarousel;
