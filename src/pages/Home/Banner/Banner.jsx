import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="hero min-h-[calc(80vh)] place-items-stretch"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1569447891824-7a1758aa73a2?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Gradient Overlay: Dark on left, transparent on right */}
      <div className="hero-overlay bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

      <div className="hero-content text-neutral-content w-full justify-start px-8 md:px-16">
        <div className="max-w-2xl text-left">
          <h1 className="mb-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Find the Right Scholarship. <br />
            <span className="text-primary">Apply with Confidence.</span>
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl leading-relaxed">
            Explore verified scholarships from top universities worldwide.
            Compare eligibility, deadlines, and benefits — all in one place.
          </p>
          <div className="flex gap-4">
            <Link
              to={"/scholarships"}
              className="btn btn-primary btn-lg rounded-full px-8 shadow-lg hover:scale-105 transition-transform"
            >
              All Scholarships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
