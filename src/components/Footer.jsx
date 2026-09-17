import { ChevronDown, Heart, Play, Send } from "lucide-react";
import { useState } from "react";

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const footerSections = [
    {
      id: "explore",
      title: "Explore",
      links: ["Home", "Movies", "TV Shows", "Top Rated", "Upcoming"],
    },
    {
      id: "genres",
      title: "Genres",
      links: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller"],
    },
    {
      id: "support",
      title: "Support",
      links: [
        "Help Center",
        "Terms of Service",
        "Privacy Policy",
        "Cookie Preferences",
        "FAQ",
      ],
    },
  ];

  const socialIcons = [
    { Icon: FacebookIcon, href: "#" },
    { Icon: TwitterIcon, href: "#" },
    { Icon: InstagramIcon, href: "#" },
    { Icon: YoutubeIcon, href: "#" },
  ];

  return (
    <footer className="relative w-full bg-[#070913] text-slate-300 pt-20 pb-10 border-t border-white/10 overflow-hidden">
      {/* Center Soft Radial Gradient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-red-600/10 rounded-full blur-[140px]" />

      <div className="relative z-10 w-11/12 lg:max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 pb-14 border-b border-white/10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#" className="flex items-center gap-2.5 select-none">
              <div className="w-10 h-10 rounded-sm bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Cine<span className="text-red-500">ma</span>
              </span>
            </a>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-sm font-normal">
              Discover, track, and stream your favorite movies and TV shows
              anytime, anywhere with seamless ultra-HD quality.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <label className="block text-xs md:text-sm font-bold text-white uppercase tracking-wider mb-2.5">
                Stay Updated
              </label>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative max-w-sm flex items-center"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-sm pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-sm transition-all shadow-md shadow-red-600/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Collapsible Link Columns */}
          {footerSections.map((section) => {
            const isOpen = openSection === section.id;
            return (
              <div
                key={section.id}
                className="border-b border-white/5 pb-4 md:border-b-0 md:pb-0"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-base font-bold text-white uppercase tracking-wider md:cursor-default"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 md:hidden text-red-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden md:block ${
                    isOpen ? "max-h-64 mt-3" : "max-h-0 md:max-h-none md:mt-4"
                  }`}
                >
                  <ul className="space-y-3 text-sm md:text-base font-normal">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-slate-400 hover:text-red-500 transition-colors inline-block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm md:text-base">
          <p className="flex items-center gap-1.5 text-slate-500">
            © {new Date().getFullYear()} Cinema. Built with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
            for movie lovers.
          </p>

          <div className="flex items-center gap-3">
            {socialIcons.map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-red-500/50 transition-all shadow-sm"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
