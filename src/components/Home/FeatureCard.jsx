const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="mb-4 text-4xl">{icon}</div>

      <h3 className="mb-3 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;