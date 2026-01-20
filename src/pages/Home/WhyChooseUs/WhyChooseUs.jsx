const WhyChooseUs = () => {
    const points = [
        {
            title: "Curated Scholarships",
            desc: "We list only verified scholarships to save you time and effort.",
        },
        {
            title: "Easy to Apply",
            desc: "Step-by-step guides and resources make applying simple.",
        },
        {
            title: "Global Opportunities",
            desc: "Explore scholarships for international and local students.",
        },
        {
            title: "Trusted by Students",
            desc: "Thousands of students rely on Scholar Stream for updates.",
        },
    ];

    return (
        <section className="py-16 px-4 md:px-8 bg-base-200 text-base-content">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Choose Scholar Stream?</h2>
                <p className="mt-2 text-base md:text-lg text-base-content/70">
                    Everything you need to find the right scholarship, in one place.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {points.map((point, idx) => (
                    <div
                        key={idx}
                        className="card p-6 bg-base-100 shadow rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                        <p className="text-sm text-base-content/80">{point.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
