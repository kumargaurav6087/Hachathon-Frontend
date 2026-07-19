const HackathonCard = ({
  title,
  date,
  location,
  mode,
  prize,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
      <div className="bg-blue-600 p-5 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <div className="space-y-3 p-6">
        <p>
          <span className="font-semibold">📅 Date:</span> {date}
        </p>

        <p>
          <span className="font-semibold">📍 Location:</span> {location}
        </p>

        <p>
          <span className="font-semibold">💻 Mode:</span> {mode}
        </p>

        <p>
          <span className="font-semibold">🏆 Prize:</span> {prize}
        </p>

        <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default HackathonCard;