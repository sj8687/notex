import { FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:ml-[180px] ">
      <div className="max-w-6xl mx-auto grid grid-cols-4  md:mt-[80px]   md:grid-cols-4 gap-8 text-[13px]">
        {/* Column 1 - Company */}
        <div>
          <h2 className="text-xl font-bold mb-4">Company</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 2 - Services */}
        <div>
          <h2 className="text-xl font-bold mb-4">Services</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Web Development</a></li>
            <li><a href="#" className="hover:text-white transition">UI/UX Design</a></li>
            <li><a href="#" className="hover:text-white transition">SEO Optimization</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h2 className="text-xl font-bold mb-4">Resources</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          </ul>
        </div>

        {/* Column 4 - Socials with Icons */}
        <div className="ml-3 md:ml-0">
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-8  md:mr-28">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
