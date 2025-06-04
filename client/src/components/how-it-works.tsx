export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Search & Browse",
      description: "Tell us what you need and browse through verified professionals in your area with reviews and ratings.",
      color: "bg-blue-600"
    },
    {
      number: 2,
      title: "Compare & Contact",
      description: "Compare profiles, read reviews, and contact professionals directly to discuss your project and get quotes.",
      color: "bg-green-600"
    },
    {
      number: 3,
      title: "Book & Relax",
      description: "Schedule your service at a convenient time and let our trusted professionals take care of the rest.",
      color: "bg-yellow-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get connected with trusted professionals in just a few simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className={`${step.color} text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6`}>
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
