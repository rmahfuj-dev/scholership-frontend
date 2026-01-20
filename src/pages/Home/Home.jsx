import { motion } from "framer-motion";
import Banner from "./Banner/Banner";
import FAQ from "./FAQ/FAQ";
import TopScholarship from "./TopScholarship/TopScholarship";
import Success from "./Success/Success";
import NewsLetter from "./NewsLetter/NewsLetter";
import ScholarshipCategories from "./ScholarshipCategories/ScholarshipCategories";
import HowItWorks from "./HowItWorks/HowItWorks";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const Home = () => {
  // 1. Define the animation behavior
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="overflow-hidden">
      {/* Banner */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Banner />
      </motion.div>

      {/* Top Scholarship */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="my-12"
      >
        <TopScholarship />
      </motion.div>

      {/* Scholarship Categories */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="my-12"
      >
        <ScholarshipCategories />
      </motion.div>

      {/* How It Works */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="my-12"
      >
        <HowItWorks />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="my-12"
      >
        <WhyChooseUs />
      </motion.div>

      {/* Success / Contact Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="my-12"
      >
        <Success />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="my-12"
      >
        <FAQ />
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="my-12"
      >
        <NewsLetter />
      </motion.div>
    </section>
  );
};

export default Home;
