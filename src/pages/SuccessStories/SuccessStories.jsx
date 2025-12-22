import { Quote, GraduationCap, ArrowRight, User } from "lucide-react";
import { Link } from "react-router";
import Container from "../../components/Container/Container";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      university: "Harvard University",
      scholarship: "MBA Future Leaders Scholarship",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      quote:
        "Scholar Stream made my dream of studying at Harvard a reality. The application process was seamless!",
      year: "2023",
      degree: "Masters in Business Administration",
    },
    {
      id: 2,
      name: "Michael Chen",
      university: "University of Oxford",
      scholarship: "Rhodes Scholarship",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      quote:
        "I found the perfect scholarship that matched my profile. The guidance provided was exceptional.",
      year: "2022",
      degree: "PhD in Computer Science",
    },
    {
      id: 3,
      name: "Emily Davis",
      university: "MIT",
      scholarship: "STEM Excellence Fellowship",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      quote:
        "Thanks to this platform, I secured full funding for my research at MIT. Highly recommended!",
      year: "2023",
      degree: "MS in Engineering",
    },
    {
      id: 4,
      name: "David Kim",
      university: "Stanford University",
      scholarship: "Global Leaders Program",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      quote:
        "The filtered search helped me find scholarships I didn't even know existed. Truly a game changer.",
      year: "2024",
      degree: "Bachelors in Economics",
    },
    {
      id: 5,
      name: "Lisa Wong",
      university: "University of Toronto",
      scholarship: "International Merit Award",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      quote:
        "From application to acceptance, the journey was smooth. I'm now studying in Canada debt-free!",
      year: "2023",
      degree: "Masters in Public Health",
    },
    {
      id: 6,
      name: "James Wilson",
      university: "ETH Zurich",
      scholarship: "Excellence Scholarship",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      quote:
        "Studying in Switzerland was a dream. Scholar Stream connected me with the right opportunity.",
      year: "2022",
      degree: "MSc in Physics",
    },
  ];

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-primary-content py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-lg opacity-90">
              Meet the brilliant minds who transformed their dreams into reality
              through Scholar Stream. Their journeys inspire us every day.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Students Placed", value: "5,000+" },
            { label: "Scholarships Awarded", value: "$10M+" },
            { label: "Partner Universities", value: "200+" },
            { label: "Countries Reached", value: "50+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="stat bg-base-100 shadow-lg rounded-xl text-center"
            >
              <div className="stat-value text-primary text-3xl md:text-4xl">
                {stat.value}
              </div>
              <div className="stat-desc text-base font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="card-body relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/10">
                  <Quote size={60} />
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={story.image} alt={story.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-sm text-gray-500">
                      {story.year} Scholar
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-600 italic mb-6 relative z-10">
                  "{story.quote}"
                </p>

                {/* Scholarship Info */}
                <div className="mt-auto pt-4 border-t border-base-200">
                  <div className="flex items-start gap-2 mb-2">
                    <GraduationCap className="size-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-primary">
                        {story.university}
                      </p>
                      <p className="text-xs text-gray-500">
                        {story.scholarship}
                      </p>
                    </div>
                  </div>
                  <div className="badge badge-outline badge-sm mt-2">
                    {story.degree}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="card-body p-10 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Write Your Own Success Story?
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto mb-8">
                Join thousands of students who have found their perfect
                scholarship match. Your journey to a world-class education
                starts here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/scholarships"
                  className="btn btn-primary btn-lg gap-2"
                >
                  Find Scholarships <ArrowRight className="size-5" />
                </Link>
                <Link to="/signUp" className="btn btn-outline btn-lg">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SuccessStories;
