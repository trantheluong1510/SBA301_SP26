import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import {banners} from "../data/banners";

function BannerCarousel() {
  return (
    <Carousel fade interval={1000}>
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <Image
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{ objectFit: 'cover', maxHeight: '450px' }}
          />
          <Carousel.Caption style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px' }}>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
