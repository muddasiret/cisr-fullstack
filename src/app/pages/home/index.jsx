import { Divider, Typography } from "antd";
import Gallery from "./Gallery";
import Bottomcards from "./BottomCards";

const { Title } = Typography;

const Home = () => {
  return (
    <div>
      <Title className="m-0" level={3}>
        Home Page
      </Title>
      <div className="mb-5">
        <div>
          <Gallery />
        </div>
      </div>
      <Divider />
      <div className="mt-10">
        <div>
          <Bottomcards />
        </div>
      </div>
    </div>
  );
};

export default Home;
