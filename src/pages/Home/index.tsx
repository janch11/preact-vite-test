import tatumLogo from "../../assets/tatum.jpeg";
import RateForm from "../../features/RateFrom/RateFrom";
import "./style.css";

const Home = () => {
  return (
    <section class="home">
      <img class="home__image" src={tatumLogo} alt="Tatum logo" />
      <h1 class="home__title">Tatum Hello</h1>

      <RateForm />
    </section>
  );
};

export default Home;