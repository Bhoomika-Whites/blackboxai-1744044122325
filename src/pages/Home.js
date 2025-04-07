export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Cancer Detection
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Early detection saves lives. Our advanced AI analyzes medical reports with 95% accuracy.
          </p>
          <button className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature cards would go here */}
          </div>
        </div>
      </section>
    </div>
  );
}