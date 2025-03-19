
const About = () => {
  return (
      <section className="p-8 max-w-5xl mx-auto text-center mt-20">
        <h1 className="text-5xl font-bold text-white mb-6">About Note<span className="text-[60px] text-green-400">X</span></h1>
        <p className="text-lg text-gray-400 mb-8">
          Welcome to <span className="text-blue-400 font-semibold">Notex</span>, your ultimate note-taking companion. 
          Designed for professionals, students, and creatives, Notex helps you capture and organize ideas effortlessly.
        </p>

        {/* Our Mission Section */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            We strive to create a **fast, secure, and intuitive** note-taking experience that syncs seamlessly across devices. 
            Our goal is to enhance productivity with a clean and distraction-free interface.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">📄 Simplicity</h3>
            <p className="text-gray-300">A clutter-free design that lets you focus on what matters—your notes.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">🔒 Security</h3>
            <p className="text-gray-300">End-to-end encryption ensures that your notes stay private and protected.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">⚡ Speed</h3>
            <p className="text-gray-300">Blazing-fast performance with real-time syncing across all your devices.</p>
          </div>
        </div>
      </section>
  );
};

export default About;
