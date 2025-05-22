import { ArrowRight } from 'lucide-react'
export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload Content',
      description:
        'Paste a YouTube link, upload a PDF/DOCX document, or an image containing text.',
      color: 'bg-white text-primary',
    },
    {
      number: '02',
      title: 'Extract Text',
      description:
        'Our system automatically extracts text from your content using advanced processing techniques.',
      color: 'bg-white text-primary',
    },
    {
      number: '03',
      title: 'AI Processing',
      description:
        'Gemini API analyzes the text and generates concise notes and flashcards optimized for learning.',
      color: 'bg-white text-primary',
    },
    {
      number: '04',
      title: 'Study & Review',
      description:
        'Access your generated materials anytime from your dashboard and improve your learning.',
      color: 'bg-white text-primary',
    },
  ]
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white to-primary-light/10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-custom-black mb-4 font-manrope">
            How TuonTaBai Works
          </h2>
          <p className="text-xl text-custom-black max-w-3xl mx-auto font-sora">
            Transform any content into study materials in just a few simple
            steps.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex mb-8 items-start">
              <div
                className={`bg-primary-light text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 font-manrope`}
              >
                {step.number}
              </div>
              <div className="ml-6 bg-white border border-custom-gray p-6 rounded-xl shadow-sm flex-1">
                <h3 className="text-xl font-semibold text-custom-black mb-2 font-manrope">
                  {step.title}
                </h3>
                <p className="text-custom-black font-sora">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-4">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="cursor-pointer group px-6 py-3 bg-custom-black text-white rounded-full hover:bg-custom-black/90 transition-all inline-flex items-center justify-center">
            Try It Now — Free
            <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
