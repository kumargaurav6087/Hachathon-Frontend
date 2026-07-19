import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Hackathon Participant",
      image: "https://placehold.co/100x100",
      review:
        "This platform made team registration and project submission very easy.",
    },
    {
      id: 2,
      name: "Priya Verma",
      role: "Team Leader",
      image: "https://placehold.co/100x100",
      review:
        "I was able to manage my team and track the complete hackathon process.",
    },
    {
      id: 3,
      name: "Aman Singh",
      role: "Hackathon Winner",
      image: "https://placehold.co/100x100",
      review:
        "The leaderboard and judging process were transparent and well managed.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="font-semibold text-blue-600">
            TESTIMONIALS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
            What Participants Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            See what participants and team leaders think about our
            hackathon platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              review={testimonial.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;