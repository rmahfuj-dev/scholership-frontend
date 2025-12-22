import { Link } from "react-router";
import {
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-primary"
            >
              <GraduationCap className="size-8" />
              <span>Scholar Stream</span>
            </Link>
            <p className="text-base-content/70">
              Connecting students with world-class education opportunities. Find
              scholarships, grants, and financial aid to pursue your dreams
              globally.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white transition-colors"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "All Scholarships", href: "/scholarships" },
                { label: "About Us", href: "/about" },
                { label: "Success Stories", href: "/stories" },
                { label: "Contact Support", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base-content/70">
                <MapPin className="size-5 mt-1 text-primary shrink-0" />
                <span>
                  123 Education Lane, Academic City, Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-base-content/70">
                <Phone className="size-5 text-primary shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3 text-base-content/70">
                <Mail className="size-5 text-primary shrink-0" />
                <span>support@scholarstream.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Newsletter</h3>
            <p className="text-base-content/70 mb-4">
              Subscribe to get the latest scholarship updates and news directly
              to your inbox.
            </p>
            <div className="join w-full">
              <input
                className="input input-bordered join-item w-full focus:outline-none focus:border-primary"
                placeholder="Enter your email"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
            <p className="text-xs text-base-content/50 mt-3">
              We care about your data in our{" "}
              <Link to="/privacy" className="underline hover:text-primary">
                privacy policy
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/60">
          <p>
            © {new Date().getFullYear()} Scholar Stream. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
