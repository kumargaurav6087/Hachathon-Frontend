const StatCard = ({ number, title }) => {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-lg">
      <h3 className="text-4xl font-bold text-blue-600 md:text-5xl">
        {number}
      </h3>

      <p className="mt-3 text-lg font-medium text-gray-700">
        {title}
      </p>
    </div>
  );
};

export default StatCard;