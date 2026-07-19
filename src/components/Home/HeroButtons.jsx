const HeroButtons = () => {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
        Get Started
      </button>

      <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
        Learn More
      </button>
    </div>
  );
};

export default HeroButtons;