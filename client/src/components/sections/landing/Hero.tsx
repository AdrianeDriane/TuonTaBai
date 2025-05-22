import { FileText, Youtube, Image, ArrowRight } from 'lucide-react'
export function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary-light/10 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-custom-black mb-6 font-manrope">
              Transform Content into Knowledge
            </h1>
            <p className="text-xl text-custom-black mb-8 font-sora">
              Upload videos, documents, or images and get AI-generated notes and
              flashcards instantly. Study smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="cursor-pointer group px-6 py-3 bg-custom-black text-white rounded-full hover:bg-custom-black/90 transition-all inline-flex items-center justify-center">
                Get Started — Free
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="cursor-pointer group px-6 py-3 bg-white text-custom-black border border-custom-gray rounded-full hover:bg-custom-gray/5 transition-all inline-flex items-center justify-center">
                See How It Works
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-gray-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                  />
                ))}
              </div>
              <span>Join 2,000+ students already using TuonTaBai</span>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary-light/20 p-3 rounded-lg">
                  <Youtube className="h-6 w-6 text-primary" />
                </div>
                <div className="bg-primary-light/20 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="bg-primary-light/20 p-3 rounded-lg">
                  <Image className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-500 mb-2">
                  Paste YouTube link, or upload file
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="cursor-pointer bg-primary text-white px-4 py-3 rounded-r-full hover:bg-primary/90">
                    Generate
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-primary-light/10 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-primary mb-1">
                    Notes
                  </div>
                  <div className="text-xs text-gray-500">Concise summaries</div>
                </div>
                <div className="flex-1 bg-primary-light/10 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-primary mb-1">
                    Flashcards
                  </div>
                  <div className="text-xs text-gray-500">Q&A format</div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-200 rounded-full opacity-50 z-0"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-light/50 rounded-full opacity-70 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  )
}