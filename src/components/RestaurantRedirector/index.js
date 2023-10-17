import { useParams } from "react-router-dom";
import RestaurantDetails from "../RestaurantDetails";

const RestaurantRedirector = () => {
  const { id } = useParams();
  console.log(id);
  return <RestaurantDetails id={id} />;
};

export default RestaurantRedirector;
