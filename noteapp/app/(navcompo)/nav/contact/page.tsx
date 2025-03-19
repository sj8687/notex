import { FC } from "react";

const Contact: FC = () => {
  return (
      <section className="p-6 max-w-4xl mx-auto text-center mt-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-400 mb-4">
          Have questions or need support? Reach out to us!
        </p>
        <form className="bg-gray-900 p-6 rounded-lg  border shadow-[0_0_10px_rgba(900,200,100,30)] ">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <textarea 
            placeholder="Your Message" 
            className="w-full p-2 bg-gray-800 text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={13}
 
          ></textarea>
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </section>
  );
};

export default Contact;
