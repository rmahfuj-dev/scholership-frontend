const ScholarshipCategories = () => {
  const categories = [
    { title: "Undergraduate", description: "Scholarships for Bachelor's programs" },
    { title: "Postgraduate", description: "Scholarships for Master's & PhD" },
    { title: "International", description: "Study abroad opportunities" },
    { title: "Government", description: "Funded by government organizations" },
    { title: "Private", description: "Offered by private institutions" },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Scholarship Categories</h2>
        <p className="text-base md:text-lg mt-2 text-base-content/70">
          Explore scholarships based on your study level and interests
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="card p-6 bg-base-200 shadow hover:shadow-lg transition-shadow rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
            <p className="text-sm text-base-content/80">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScholarshipCategories;
