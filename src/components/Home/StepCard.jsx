const StepCard = ({ step, title, description }) => {
  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
        {step}
      </div>

      <h3 className="text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default StepCard;