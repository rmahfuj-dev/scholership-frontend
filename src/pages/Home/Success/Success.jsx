import Container from "../../../components/Container/Container";
import { FaQuoteLeft, FaStar, FaUniversity, FaAward } from "react-icons/fa";

const Success = () => {
  const stats = [
    { label: "Scholarships Won", value: "1,500+", icon: <FaAward /> },
    { label: "Total Awarded", value: "$2.4M", icon: <FaQuoteLeft /> }, // Using quote as placeholder or change to Money
    { label: "Universities", value: "120+", icon: <FaUniversity /> },
    { label: "Success Rate", value: "94%", icon: <FaStar /> },
  ];

  const stories = [
    {
      id: 1,
      name: "Sarah Jenkins",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      university: "Harvard University",
      scholarship: "Full Ride Merit Scholarship",
      date: "Sep 2023",
      quote:
        "I never thought I'd get a full ride. Scholar Stream made the filtering process so easy. I found a niche scholarship for women in STEM that changed my life!",
    },
    {
      id: 2,
      name: "David Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
      university: "University of Toronto",
      scholarship: "International Excellence Award",
      date: "Jan 2024",
      quote:
        "As an international student, finding funding seemed impossible. The 'International' filter here saved me hours of searching. I'm now studying Computer Science debt-free.",
    },
    {
      id: 3,
      name: "Aisha Diallo",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop",
      university: "Oxford University",
      scholarship: "Rhodes Global Scholarship",
      date: "Aug 2023",
      quote:
        "The application tracking feature kept me organized. I applied to 5 universities and got accepted into 3 with funding. Highly recommend this platform!",
    },
  ];

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="badge badge-secondary badge-outline mb-4 p-3 font-bold uppercase tracking-wider">
            Wall of Love
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            From Application to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Acceptance Letter
            </span>
          </h2>
          <p className="text-lg text-gray-500">
            Join thousands of students who found their dream university and
            financial freedom through our platform.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-sm text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-primary text-3xl flex justify-center mb-3 opacity-80">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-gray-800">
                {stat.value}
              </h3>
              <p className="text-gray-500 font-medium text-sm mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="card bg-base-100 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="card-body p-8 relative">
                {/* Large Quote Icon Background */}
                <FaQuoteLeft className="absolute top-6 right-6 text-6xl text-gray-100 -z-0 group-hover:text-primary/10 transition-colors" />

                {/* Stars */}
                <div className="flex gap-1 text-yellow-400 mb-4 z-10">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-600 italic mb-6 relative z-10 leading-relaxed">
                  "{story.quote}"
                </p>

                <div className="divider my-0"></div>

                {/* User Profile */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                      <img src={story.image} alt={story.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                    <p className="text-xs text-primary font-semibold flex items-center gap-1">
                      <FaUniversity /> {story.university}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Won: {story.scholarship}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Success;
