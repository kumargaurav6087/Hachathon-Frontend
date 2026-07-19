const SponsorCard = ({ name, logo }) => {
  return (
    <div className="flex h-32 items-center justify-center rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={logo}
        alt={name}
        className="max-h-16 max-w-[150px] object-contain"
      />
    </div>
  );
};

export default SponsorCard;