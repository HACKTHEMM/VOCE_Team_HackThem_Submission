import Link from "next/link"
import { Mic } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-white/20 dark:border-slate-800/50 glass py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14 lg:mb-16">          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mic className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">SalesSpeak</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Revolutionizing sales conversations with AI-powered voice technology. Empowering businesses to connect
              with customers in their native language.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4">              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50" aria-label="Twitter">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50" aria-label="LinkedIn">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50" aria-label="Pinterest">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50" aria-label="GitHub">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.188 4.725-1.292 1.292-2.867 2.019-4.725 2.188-.855 0-1.725-.15-2.553-.447 1.125-.15 2.216-.57 3.131-1.256-.525-.01-1.008-.175-1.404-.465-.396-.29-.682-.693-.83-1.153.262.05.525.065.787.035-.56-.12-1.029-.425-1.372-.86-.342-.435-.517-.94-.517-1.455.262.15.562.24.877.255-.525-.35-.84-.94-.84-1.575 0-.35.087-.682.262-.982 1.155 1.417 2.727 2.282 4.455 2.372-.035-.15-.052-.307-.052-.465 0-.668.262-1.295.735-1.768s1.1-.735 1.768-.735c.7 0 1.295.297 1.732.787.525-.105 1.045-.297 1.522-.577-.175.56-.542 1.027-1.022 1.297.472-.052.927-.175 1.367-.35-.315.472-.717.892-1.207 1.207z" />
                </svg>
              </a>
            </div>
          </div>          {/* Product */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>          {/* Company */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Press Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>          {/* Support & Legal */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  System Status
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>        {/* Bottom Section */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
            {/* Copyright */}
            <div className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm text-center lg:text-left">
              © 2024 SalesSpeak Technologies Pvt. Ltd. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-xs sm:text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-xs sm:text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-xs sm:text-sm transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/gdpr"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-xs sm:text-sm transition-colors"
              >
                GDPR
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 gap-4">
              <div className="text-slate-500 dark:text-slate-400 text-xs text-center md:text-left">
                Made with ❤️ in India | Serving customers globally in 10+ languages
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center whitespace-nowrap">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>
                  All systems operational
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">99.9% uptime</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">ISO 27001 certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
