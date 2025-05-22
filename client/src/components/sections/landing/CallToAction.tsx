import { CheckCircle, ArrowRight } from 'lucide-react'
export function CallToAction() {
  const benefits = [
    'Save hours of manual note-taking',
    'Create study materials in seconds',
    'Access your content anywhere',
    'Improve learning retention with flashcards',
    'Free tier available to get started',
  ]
  return (
    <section className="py-20 bg-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-manrope">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl mb-8 text-white font-sora">
            Join thousands of students who are already studying smarter with
            TuonTaBai.
          </p>
          <div className="mb-10">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-xl mx-auto font-sora">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-white" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cursor-pointer group px-6 py-3 bg-white text-custom-black rounded-full hover:bg-white/90 transition-all inline-flex items-center justify-center">
              Get Started — Free
              <ArrowRight className="cursor-pointer h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="cursor-pointer group px-6 py-3 bg-transparent text-white border border-white rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center">
              View Pricing
              <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
