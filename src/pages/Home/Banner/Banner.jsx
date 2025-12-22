import { Link } from "react-router";
import BannerImg from "../../../assets/banner-bg.jpg";

const Banner = () => {
  return (
    <div
      className="hero min-h-[calc(80vh)]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/20/cambridge.JPG?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-5xl font-bold leading-14">
            Find the Right Scholarship. <br /> Apply with Confidence.
          </h1>
          <p className="mb-5 text-lg text-accent-content">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to={"/scholarships"} className="btn btn-primary">
            All Scholarships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
