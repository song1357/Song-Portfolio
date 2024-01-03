// Importing required modules and types from 'next/server' and other dependencies
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Importing the i18n configuration
import { i18n } from '@/i18n.config'

// Importing locale matcher utility and a negotiator for content negotiation
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Function to determine the locale from the request
function getLocale(request: NextRequest): string | undefined {
  // Creating an object to hold headers for negotiation
  const negotiatorHeaders: Record<string, string> = {}
  // Populating the negotiatorHeaders object with request headers
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Suppressing TypeScript error about i18n.locales being readonly
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  // Getting the list of languages preferred by the user
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Matching the best locale based on user preference and available locales
  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

// Middleware function to handle internationalization redirects
export function middleware(request: NextRequest) {
   // Extracting the pathname from the request URL
  const pathname = request.nextUrl.pathname
   // Checking if the URL does not start with a known locale
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Determining the best locale for the user
    const locale = getLocale(request)
    // Creating and returning a redirect response to the localized URL
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

// Configuring the middleware
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
    // Specifying URL patterns to apply the middleware, ignoring certain paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
