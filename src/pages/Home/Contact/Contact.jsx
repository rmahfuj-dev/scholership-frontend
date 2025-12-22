import Container from "../../../components/Container/Container";
import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      e.target.reset();
    }, 1500);
  };

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Information */}
          <div className="space-y-8">
            <div>
              <div className="badge badge-primary badge-outline mb-4">
                Support
              </div>
              <h2 className="text-4xl font-bold mb-4 text-base-content">
                Let's Start a <span className="text-primary">Conversation</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Have questions about scholarship applications, university
                details, or payment processes? Our support team is here to guide
                you through every step of your academic journey.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="grid gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/50 border border-base-200 transition-colors hover:border-primary/30">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    For general inquiries
                  </p>
                  <a
                    href="mailto:support@scholarstream.com"
                    className="text-primary font-medium hover:underline"
                  >
                    support@scholarstream.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/50 border border-base-200 transition-colors hover:border-primary/30">
                <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                  <Phone className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    Mon-Fri from 9am to 6pm
                  </p>
                  <a
                    href="tel:+8801234567890"
                    className="text-secondary font-medium hover:underline"
                  >
                    +880 1234 567890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/50 border border-base-200 transition-colors hover:border-primary/30">
                <div className="bg-accent/10 p-3 rounded-lg text-accent">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p className="text-gray-500 text-sm mb-1">Our main office</p>
                  <p className="font-medium">
                    123 Education Lane, Academic City, Dhaka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="card bg-base-100 shadow-2xl border border-base-200">
            <div className="card-body p-8">
              <h3 className="card-title text-2xl mb-2">Send us a message</h3>
              <p className="text-gray-500 text-sm mb-6">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="label">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered focus:outline-none focus:border-primary bg-base-200/30"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="label">
                      <span className="label-text font-medium">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered focus:outline-none focus:border-primary bg-base-200/30"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text font-medium">Subject</span>
                  </label>
                  <select className="select select-bordered focus:outline-none focus:border-primary bg-base-100 w-full">
                    <option disabled selected>
                      Select a topic
                    </option>
                    <option>General Inquiry</option>
                    <option>Application Issue</option>
                    <option>Payment Support</option>
                    <option>University Partnership</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text font-medium">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 focus:outline-none focus:border-primary bg-base-200/30 w-full"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        Send Message <Send className="size-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
