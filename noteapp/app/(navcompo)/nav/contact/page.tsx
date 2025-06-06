"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/contact/contact`,
        
          formData
      ,
      {
          headers: {
              "Content-Type": "application/json"
          },
          withCredentials:true,
      }

    )

     if(res.status == 200){
                    setSuccess(true);
                    setFormData({ name: "", email: "", message: "" });
                    toast.success('message sent successfully.......', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                   });
                  }   

       else {
        toast.error("Failed to send message. Try again later.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center ">
      <section className="p-6 max-w-4xl mx-auto text-center mt-11">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-400 mb-4">
          Have questions or need support? Reach out to us!
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg  shadow-[0_0_10px_rgba(200,700,550,30)]">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={11}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded transition duration-300 ease-in-out text-black"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
