import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API } from '../../../config';
import './MainCarousel.scss';

class MainCarousel extends Component {
  constructor() {
    super();
    this.state = {
      sliderPosition: 0,
      sliderArr: [],
    };
  }

  componentDidMount() {
    fetch(API.SUBCATEGORY)
      .then(res => res.json())
      .then(data => {
        this.setState({
          sliderArr: data.subcategories,
        });
      });
    setInterval(this.slideRight, 4000);
  }

  slideLeft = () => {
    const { sliderPosition } = this.state;
    this.setState({
      sliderPosition: sliderPosition === 0 ? 0 : sliderPosition + 100,
    });
  };

  slideRight = () => {
    const { sliderPosition, sliderArr } = this.state;

    this.setState({
      sliderPosition:
        sliderPosition === -100 * (sliderArr.length - 1)
          ? 0
          : sliderPosition - 100,
    });
  };

  goToCategory = id => {
    this.props.history.push(`/list/1/${id}`);
  };

  render() {
    const { sliderPosition, sliderArr } = this.state;

    return (
      <div className="visualWrap">
        <div className="visualSlide">
          <div
            className="imgWrap"
            style={{ transform: `translateX(${sliderPosition}%)` }}
          >
            {sliderArr &&
              sliderArr.map((sliderElement, i) => {
                return (
                  <img
                    alt={sliderElement.alt}
                    src={sliderElement.image_url}
                    key={sliderElement.id}
                    onClick={() => this.goToCategory(sliderElement.id)}
                  />
                );
              })}
          </div>

          <button className="leftButton" onClick={this.slideLeft}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="rightButton" onClick={this.slideRight}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(MainCarousel);
