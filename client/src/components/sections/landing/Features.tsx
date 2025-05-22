import { cloneElement } from 'react'
import {
  Youtube,
  FileText,
  Image,
  Key,
  BrainCircuit,
  LayoutDashboard,
} from 'lucide-react'
export function Features() {
  const features = [
    {
      icon: <Key className="h-6 w-6 text-indigo-600" />,
      title: 'Authentication System',
      description:
        'Secure sign-up and login with email or Google OAuth. Track your usage and access your saved content.',
    },
    {
      icon: <Youtube className="h-6 w-6 text-indigo-600" />,
      title: 'Multiple Content Sources',
      description:
        'Upload YouTube links, PDFs, Word documents, or images and extract text automatically.',
    },
    {
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      title: 'Smart Text Extraction',
      description:
        'Our system extracts text from various file types, even non-highlightable PDFs using OCR technology.',
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-indigo-600" />,
      title: 'AI-Powered Generation',
      description:
        'Gemini API transforms extracted content into concise notes and helpful flashcards.',
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-indigo-600" />,
      title: 'User Dashboard',
      description:
        'Access your upload history and generated content. View and download notes and flashcards anytime.',
    },
    {
      icon: <Image className="h-6 w-6 text-indigo-600" />,
      title: 'OCR Technology',
      description:
        'Extract text from images and scanned documents with advanced optical character recognition.',
    },
  ]
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-custom-black mb-4 font-manrope">
            Features Designed for Effective Learning
          </h2>
          <p className="text-xl text-custom-black max-w-3xl mx-auto font-sora">
            TuonTaBai combines powerful AI with a simple interface to transform
            any content into study materials.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-custom-gray rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-primary-light/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                {cloneElement(feature.icon, {
                  className: 'h-6 w-6 text-primary',
                })}
              </div>
              <h3 className="text-xl font-semibold text-custom-black mb-2 font-manrope">
                {feature.title}
              </h3>
              <p className="text-custom-black font-sora">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
