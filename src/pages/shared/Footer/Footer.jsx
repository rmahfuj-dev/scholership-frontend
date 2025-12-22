import { Link } from "react-router";
import { GraduationCap, Facebook, Linkedin, Instagram } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Side: Logo & Copyright */}
          <aside className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors"
            >
              <GraduationCap className="size-8 text-primary" />
              <span>Scholar Stream</span>
            </Link>

            <p className="text-sm text-neutral-content/60 md:border-l md:border-neutral-content/20 md:pl-4">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </aside>

          {/* Right Side: Social Icons */}
          <nav className="flex gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: BsTwitterX, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-ghost btn-circle text-neutral-content/80 hover:bg-primary hover:text-white transition-all"
              >
                <social.icon className="size-5" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
