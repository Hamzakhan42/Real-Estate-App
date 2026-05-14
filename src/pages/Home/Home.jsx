import Navbar from '../../components/layout/Navbar'
import HeroCarousel from '../../components/features/HeroCarousel'
import AdvancedSearchBar from '../../components/features/AdvancedSearchBar/AdvancedSearchBar'
import FeaturedApartmentsMarquee from '../../components/features/FeaturedApartmentsMarquee'
import PropertyMap from '../../components/features/PropertyMap'
import { MOCK_PROPERTIES } from '../../data/mockProperties'
import { properties as FEATURED_PROPERTIES } from '../../utils/mockData'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <HeroCarousel />
      <AdvancedSearchBar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Verified Listings',
                desc: 'Hand-reviewed properties with clear details and pricing.',
              },
              {
                title: 'Prime Locations',
                desc: 'DHA, Bahria, Gulberg, Clifton and more top neighborhoods.',
              },
              {
                title: 'Trusted Agents',
                desc: 'Work with experienced agents and transparent processes.',
              },
              {
                title: 'Fast Discovery',
                desc: 'Browse quickly and shortlist homes that match your needs.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="text-base font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedApartmentsMarquee />

      <section id="buy" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Buy with confidence
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                From shortlisting to paperwork, we focus on clarity. Compare
                neighborhoods, check pricing trends, and connect with agents who
                respond fast.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: 'Price Transparency',
                  desc: 'Clear pricing ranges and comparable listings.',
                },
                {
                  title: 'Neighborhood Insights',
                  desc: 'Amenities, commute, and lifestyle highlights.',
                },
                {
                  title: 'Secure Process',
                  desc: 'Organized steps from visit scheduling to closing.',
                },
                {
                  title: 'Smart Shortlists',
                  desc: 'Save options and keep your search structured.',
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="rent" className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Renting made simple
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Find modern apartments and family homes with flexible budgets.
                Filter by location, size, and features—then book a visit.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {[
                'Move-in ready options',
                'Family-friendly communities',
                'Near schools and markets',
                'Transparent monthly costs',
                'Quick viewing schedules',
                'Responsive support',
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                >
                  <p className="text-sm font-medium text-gray-900">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Explore Properties on Map
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Easily find homes in your favorite neighborhoods with our interactive map view.
            </p>
          </div>
          <PropertyMap properties={[...MOCK_PROPERTIES, ...FEATURED_PROPERTIES]} />
        </div>
      </section>

      <section id="agents" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Meet our agents
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Experienced professionals to guide you from discovery to deal.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex w-fit rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 hover:shadow-xl"
            >
              Talk to an agent
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Ayesha Khan',
                role: 'Residential Specialist',
                area: 'Lahore',
                img: 'https://i.pravatar.cc/240?img=47',
              },
              {
                name: 'Hamza Ali',
                role: 'Investment Advisor',
                area: 'Islamabad',
                img: 'https://i.pravatar.cc/240?img=12',
              },
              {
                name: 'Sara Ahmed',
                role: 'Luxury Homes',
                area: 'Karachi',
                img: 'https://i.pravatar.cc/240?img=32',
              },
            ].map((a) => (
              <article
                key={a.name}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={a.img}
                    alt={a.name}
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {a.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{a.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Focus area: <span className="font-medium">{a.area}</span>
                </p>
                <div className="mt-5 flex gap-3">
                  <a
                    href="#contact"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                  >
                    Contact
                  </a>
                  <a
                    href="#featured"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-200"
                  >
                    Listings
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Contact us
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Share your requirements and we’ll connect you with options that
                match your budget and location.
              </p>

              <div className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">
                  Quick info
                </p>
                <p className="text-sm text-white/70">
                  Email: support@realestateapp.com
                </p>
                <p className="text-sm text-white/70">
                  Phone: +92 300 0000000
                </p>
                <p className="text-sm text-white/70">
                  Hours: Mon–Sat, 10:00–19:00
                </p>
              </div>
            </div>

            <form
              className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5"
              aria-label="Contact form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-900"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-900"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
                    placeholder="Tell us what you’re looking for..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-xl"
                >
                  Send message
                </button>

                <p className="text-xs text-gray-500">
                  By submitting, you agree to be contacted about your request.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
