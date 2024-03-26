import { Typography } from "antd";
import CarouselForm from "./CarouselForm";

const { Title } = Typography;

const Home = () => {
  return (
    <div>
      <Title className="m-0" level={3}>
        Home
      </Title>
      <div>
        <Title className="m-0" level={5}>
          Carousel
        </Title>
        <div>
          <CarouselForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
