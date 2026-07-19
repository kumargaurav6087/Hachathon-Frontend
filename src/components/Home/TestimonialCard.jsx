const TestimonialCard = ({
  name,
  role,
  review,
  image,
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="mb-4 flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-bold text-gray-900">
            {name}
          </h3>

          <p className="text-sm text-gray-500">
            {role}
          </p>
        </div>
      </div>

      <div className="mb-3 text-yellow-500">
        ⭐⭐⭐⭐⭐
      </div>

      <p className="leading-7 text-gray-600">
        “{review}”
      </p>
    </div>
  );
};

export default TestimonialCard;