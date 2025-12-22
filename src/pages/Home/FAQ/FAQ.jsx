import Container from "../../../components/Container/Container";
import { Link } from "react-router";

const FAQ = () => {
  const faqs = [
    {
      question: "What documents are typically required for application?",
      answer:
        "Most scholarships require a valid student ID, recent academic transcripts, a recommendation letter, and a passport-sized photograph. Some may ask for a statement of purpose.",
    },
    {
      question: "Are these scholarships open to international students?",
      answer:
        "Yes! Many universities listed on Scholar Stream offer funding specifically for international applicants. Check the 'Eligibility' tab on each scholarship detail page.",
    },
    {
      question: "Can I edit my application after submitting it?",
      answer:
        "Once an application is submitted, it is locked for review. However, if you notice a critical error immediately, please contact support or the university administration directly.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use Stripe/SSL encryption to ensure all transaction data is secure. We do not store your credit card details on our servers.",
    },
    {
      question: "Is there an age limit for applying?",
      answer:
        "It varies by scholarship. While most degree-based scholarships are for students aged 18-30, there are research grants and PhD funds with no specific age upper limit.",
    },
  ];

  return (
    <section className="py-24 bg-base-200/30">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="badge badge-primary badge-outline mb-4 p-3 font-bold uppercase tracking-wider">
            Common Queries
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-base-content">
            Got Questions? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              We’ve Got Answers.
            </span>
          </h2>
          <p className="text-lg text-gray-500">
            Find answers to the most common questions about the application
            process, fees, and eligibility.
          </p>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 rounded-xl shadow-sm border border-base-200 hover:shadow-md transition-all duration-300"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-bold text-gray-700">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-500 leading-relaxed">
                <p className="pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
