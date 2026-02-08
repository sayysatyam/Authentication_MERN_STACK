const Footer = () => {
  return (
    <footer className=" border-t border-white/10 selection:bg-purple-500 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        
        {/* Left */}
        <div className="text-center md:text-left">
          <p className="text-white font-semibold text-lg">Zorixs</p>
          <p className="text-gray-400">
            Learn smarter. Practice better. 🚀
          </p>
        </div>

        {/* Center Links */}
        <div className="flex gap-6">
          <a href="/about" className="hover:text-purple-400 transition">
            About
          </a>
          <a href="/feature" className="hover:text-purple-400 transition">
           Feature
          </a>
          <a href="/privacy" className="hover:text-purple-400 transition">
            Privacy
          </a>
        </div>

        {/* Right */}
        <div className="text-center md:text-right gap-1">
          <p>© {new Date().getFullYear()} Zorixs</p>
          <p>Built with ❤️ for learners</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
