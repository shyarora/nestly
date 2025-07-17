import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Safety information
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/diversity"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Diversity & Belonging
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <Link
                  href="/associates"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Nestly Associates
                </Link>
              </li>
              <li>
                <Link
                  href="/frontline"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Frontline stays
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Hosting
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/host"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Host your home
                </Link>
              </li>
              <li>
                <Link
                  href="/host/experience"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Host an experience
                </Link>
              </li>
              <li>
                <Link
                  href="/responsible-hosting"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Responsible hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/resource-center"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Resource Center
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Nestly
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/newsroom"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Newsroom
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Investors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-600">
                © {currentYear} Nestly, Inc. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Terms
                </Link>
                <Link
                  href="/sitemap"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sitemap
                </Link>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-gray-600"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-gray-600"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-gray-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-gray-600"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@nestly.com"
                className="text-gray-400 hover:text-gray-600"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
