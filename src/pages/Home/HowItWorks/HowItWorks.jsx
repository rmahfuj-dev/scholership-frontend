const HowItWorks = () => {
    const steps = [
        {
            step: 1,
            title: "Browse Scholarships",
            description: "Explore scholarships that fit your study level and interests.",
        },
        {
            step: 2,
            title: "Check Requirements",
            description: "Read eligibility criteria carefully before applying.",
        },
        {
            step: 3,
            title: "Apply Online",
            description: "Fill out the application form and submit your documents.",
        },
        {
            step: 4,
            title: "Get Selected",
            description: "Wait for approval and follow up on the next steps.",
        },
    ];

    return (
        <section className="py-16 px-4 md:px-8 bg-base-200 text-base-content">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                <p className="mt-2 text-base md:text-lg text-base-content/70">
                    Follow these simple steps to apply for scholarships easily.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {steps.map((item) => (
                    <div
                        key={item.step}
                        className="card p-6 bg-base-100 shadow rounded-lg text-center flex flex-col items-center hover:shadow-lg transition-shadow"
                    >
                        <div className="text-3xl font-bold mb-4">{item.step}</div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-base-content/80">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
