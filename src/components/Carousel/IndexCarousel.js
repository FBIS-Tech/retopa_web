import React from "react"
import Slider from "react-slick"
import { Carousel } from "../Constants/indexPage"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../../scss/CarouselCard.scss"
export default function IndexCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Slider className="slider" {...settings}>
      {Carousel.map(data => {
        return (
          <div className="carouselCard">
            <div className="carousel_card_group">
              <img src={data.image} alt="carousel_image" />
              <h3>{data.name}</h3>
              <p>{data.Text}</p>
              <p className="carousel_date">{data.date}</p>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}
