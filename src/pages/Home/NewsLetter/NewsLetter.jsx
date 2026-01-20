const NewsLetter = () => {
    return (
        <section className="py-16 px-4 md:px-8 bg-base-200 text-base-content rounded-xl mx-4 md:mx-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Stay Updated with Latest Scholarships
                </h2>
                <p className="mb-8 text-base md:text-lg">
                    Subscribe to our newsletter and never miss a scholarship opportunity.
                </p>

                {/* Newsletter Form */}
                <form className="flex flex-col sm:flex-row justify-center items-center gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full sm:w-2/3 max-w-md"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-full sm:w-auto"
                    >
                        Subscribe
                    </button>
                </form>

                {/* Optional small note */}
                <p className="mt-4 text-sm text-base-content/70">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
};

export default NewsLetter;
