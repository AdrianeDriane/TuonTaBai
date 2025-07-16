import { useState } from 'react'
import { Menu, X, BookOpen, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-custom-black font-manrope">
            TuonTaBai
          </span>
        </div>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-sora">
          <a
            href="#features"
            className="text-custom-black hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-custom-black hover:text-primary transition-colors"
          >
            How It Works
          </a>
          <a
            href="#"
            className="text-custom-black hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <Link
            to="/login"
            className="cursor-pointer px-6 py-1 text-custom-black border border-custom-gray rounded-full hover:bg-custom-gray/5 transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="cursor-pointer group px-6 py-2 bg-custom-black text-white rounded-full hover:bg-custom-black/90 transition-all inline-flex items-center"
          >
            Sign Up
            <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>
        {/* Mobile menu button */}
        <button
          className="cursor-pointer md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4 font-sora">
            <a
              href="#features"
              className="text-custom-black hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-custom-black hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#"
              className="text-custom-black hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-custom-gray">
              <Link
                to="/login"
                className="cursor-pointer px-6 py-3 text-custom-black border border-custom-gray rounded-full hover:bg-custom-gray/5 transition-all inline-flex items-center justify-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="cursor-pointer group px-6 py-3 bg-custom-black text-white rounded-full hover:bg-custom-black/90 transition-all inline-flex items-center justify-center"
              >
                Sign Up
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
