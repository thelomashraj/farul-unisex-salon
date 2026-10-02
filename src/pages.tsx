import { useState } from "react"
import { Link } from "react-router"
import { address, images, services } from "./data"
import {
  BeforeAfterSlider,
  BookingForm,
  ButtonLink,
  Map,
  MarqueeStrip,
  PlaceholderImage,
  Reveal,
  ReviewCard,
  SectionHeader,
} from "./components"

const reviews = [
  [
    "For the last 5 years Riyaz bhai and his brother have been my go-to hairstylists.",
    "Deepa Choudhary",
  ],
  [
    "Hair colour came out exactly the way I imagined. Staff was friendly.",
    "Zain Abbasi",
  ],
  [
    "Incredible service, fixed my hair so beautifully. Haircut done by Afsar.",
    "Jasmine",
  ],
  ["My must-go place every month. Amazing services.", "Sandhya Luthra"],
  ["Proper hygiene maintained and original products used.", "Sheetal Kanwar"],
]

const servicePreview = [
  ["Hair", "Cuts · Colour · Balayage · Hair spa"],
  ["Skin & Facials", "Facials · Clean-up · Acne care"],
  ["Brows & Lashes", "Threading · Lamination · Lash lift"],
  ["Nails", "Manicure · Pedicure · Acrylics"],
  ["Waxing", "Full body · Face · Brazilian"],
  ["Men's Grooming", "Cuts · Beard · Face clean-up"],
  ["Bridal & Occasions", "Bridal · Pre-bridal · Party"],
]

export function HomePage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [servicePhotoPosition, setServicePhotoPosition] = useState({
    x: 0,
    y: 0,
  })
  const servicePhotos = [images.hair1, images.hero, images.hair3, images.hair2]

  return (
    <>
      <section className="hero page-pad">
        <div className="hero-copy">
          <span className="eyebrow">
            Unisex salon · Dwarka Mor · Since 20XX
          </span>
          <Reveal>
            <h1>
              Hair, skin & <em>craft</em> — done by hands you'll come back to.
            </h1>
          </Reveal>
          <p className="hero-note">
            Trusted by Dwarka for years. Rated 4.8 ★ by 195 clients on Google.
          </p>
          <div className="hero-actions">
            <ButtonLink to="/visit">Book a Chair</ButtonLink>
            <Link className="text-link" to="/services">
              View Menu →
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <PlaceholderImage
            src={images.hero}
            alt="Stylist working with a client's hair"
            className="hero-main arch"
          />
          <PlaceholderImage
            src={images.interior}
            alt="Warm salon interior"
            className="hero-small"
          />
          <div className="rating-badge">
            <span>4.8 ★</span>
            <small>
              Google rated
              <br />
              195 reviews
            </small>
          </div>
        </div>
      </section>
      <MarqueeStrip />
      <section className="section page-pad services-preview">
        <SectionHeader number="01" label="What we do">
          <h2>
            Considered care,
            <br />
            <em>never rushed.</em>
          </h2>
        </SectionHeader>
        <div className="service-list">
          {servicePreview.map(([name, detail], index) => (
            <Link
              to={`/services#${name.toLowerCase().replaceAll(" ", "-")}`}
              className="service-row"
              key={name}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              onMouseMove={(event) =>
                setServicePhotoPosition({
                  x: event.clientX + 22,
                  y: event.clientY + 22,
                })
              }
            >
              <span className="service-num">0{index + 1}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
              <b>from ₹___</b>
              <span>↗</span>
            </Link>
          ))}
        </div>
        {hoveredService !== null && (
          <PlaceholderImage
            src={servicePhotos[hoveredService % servicePhotos.length]}
            alt={`${servicePreview[hoveredService][0]} service`}
            className="service-hover-photo"
            style={{
              transform: `translate(${servicePhotoPosition.x}px, ${servicePhotoPosition.y}px)`,
            }}
          />
        )}
        <Link className="text-link end-link" to="/services">
          See full menu →
        </Link>
      </section>
      <section className="section page-pad artists-preview">
        <SectionHeader number="02" label="The artists">
          <Reveal>
            <h2>
              People don't come back for a salon. They come back for{" "}
              <em>a person</em>.
            </h2>
          </Reveal>
        </SectionHeader>
        <div className="artist-pair">
          <article>
            <PlaceholderImage
              src={images.riyaz}
              alt="Md Riyaz at work"
              className="artist-image arch"
            />
            <h3>Md Riyaz</h3>
            <p>Senior Stylist · Cuts & Colour</p>
            <blockquote>
              “He understands the brief before picking up the scissors.”
            </blockquote>
          </article>
          <article>
            <PlaceholderImage
              src={images.afsar}
              alt="Afsar at work"
              className="artist-image"
            />
            <h3>Afsar</h3>
            <p>Stylist · Cuts & Styling</p>
            <blockquote>“Afsar fixed my hair so beautifully.”</blockquote>
          </article>
          <Link className="team-more" to="/artists">
            <span>+</span> the team →
          </Link>
        </div>
      </section>
      <section className="section page-pad work">
        <SectionHeader number="03" label="The work">
          <h2>
            Quietly <em>transformative.</em>
          </h2>
        </SectionHeader>
        <BeforeAfterSlider />
        <div className="gallery-strip">
          <PlaceholderImage src={images.hair3} alt="Hair colour detail" />
          <PlaceholderImage src={images.hair4} alt="Finished hair style" />
          <PlaceholderImage src={images.team2} alt="Stylist finishing a look" />
        </div>
      </section>
      <section className="section reviews">
        <div className="page-pad">
          <SectionHeader number="04" label="In their words">
            <h2>
              The kind words
              <br />
              stay with us.
            </h2>
          </SectionHeader>
        </div>
        <div className="reviews-scroll">
          {reviews.map(([quote, name]) => (
            <ReviewCard key={name} quote={quote} name={name} />
          ))}
        </div>
        <div className="page-pad">
          <a
            className="text-link"
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
          >
            Read all 195 reviews on Google →
          </a>
        </div>
      </section>
      <section className="academy-teaser page-pad">
        <SectionHeader light number="05" label="Academy" />
        <Reveal>
          <h2>
            Learn the craft
            <br />
            <em>from the chair.</em>
          </h2>
        </Reveal>
        <p>
          Practical training on a real salon floor, taught by working
          artists—not from a textbook.
        </p>
        <ButtonLink to="/academy" light>
          Explore courses
        </ButtonLink>
      </section>
      <VisitSection />
    </>
  )
}

function VisitSection() {
  return (
    <section className="section page-pad visit-section">
      <SectionHeader number="06" label="Visit us">
        <h2>
          Come take
          <br />
          <em>a seat.</em>
        </h2>
      </SectionHeader>
      <div className="visit-grid">
        <div>
          <span className="eyebrow">Address</span>
          <p className="large-copy">{address}</p>
          <p>Above CSD Bazaar</p>
          <hr />
          <span className="eyebrow">Hours</span>
          <p>Open daily from 8 AM</p>
          <span className="eyebrow">Call</span>
          <a className="phone" href="tel:+919818465653">
            098184 65653
          </a>
        </div>
        <Map />
      </div>
    </section>
  )
}

export function ServicesPage() {
  const [filter, setFilter] = useState("All")
  const categories = Object.keys(services)
  const visible =
    filter === "All" ? categories : categories.filter((x) => x === filter)
  return (
    <>
      <PageHero
        label="The menu"
        title={
          <>
            Everything, done <em>properly</em>.
          </>
        }
        intro="No inflated rituals. Just good products, good hands and time taken where it matters."
      />
      <div className="filter-bar">
        {["All", ...categories].map((item) => (
          <button
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="section page-pad menu-list">
        {visible.map((category, index) => (
          <div
            className="menu-category"
            id={category.toLowerCase().replaceAll(" ", "-")}
            key={category}
          >
            <div className="category-head">
              <div>
                <span className="eyebrow">0{index + 1} · Category</span>
                <h2>{category}</h2>
              </div>
              <PlaceholderImage
                src={
                  [images.hair1, images.hero, images.hair3, images.hair2][
                    index % 4
                  ]
                }
                alt={`${category} service detail`}
              />
            </div>
            <div>
              {services[(category as keyof typeof services)].map((service) => (
                <div className="menu-item" key={service}>
                  <div>
                    <h3>{service}</h3>
                    <p>A considered, personalised service tailored to you.</p>
                    <Link to={`/visit?service=${encodeURIComponent(service)}`}>
                      Book →
                    </Link>
                  </div>
                  <span className="dots" />
                  <b>₹___</b>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

const artists = [
  {
    name: "Md Riyaz",
    role: "Senior Stylist",
    specialities: ["Cuts", "Colour"],
    image: images.riyaz,
    quote: "For five years, Riyaz has been my go-to.",
  },
  {
    name: "Afsar",
    role: "Stylist",
    specialities: ["Cuts", "Styling"],
    image: images.afsar,
    quote: "He fixed my hair so beautifully.",
  },
  {
    name: "Team Member 03",
    role: "Beauty Artist",
    specialities: ["Skin", "Makeup"],
    image: images.team2,
    quote: "Warm, thoughtful, and meticulous.",
  },
  {
    name: "Team Member 04",
    role: "Salon Artist",
    specialities: ["Nails", "Grooming"],
    image: images.team1,
    quote: "Every detail was considered.",
  },
]
export function ArtistsPage() {
  return (
    <>
      <PageHero
        label="The artists"
        title={
          <>
            The hands behind <em>the hair</em>.
          </>
        }
        intro="Technique matters. Listening matters more. Meet the people who make Farul feel like Farul."
      />
      <section className="section page-pad artists-page">
        {artists.map((artist, index) => (
          <article className="artist-full" key={artist.name}>
            <PlaceholderImage
              src={artist.image}
              alt={`${artist.name} portrait`}
              className="arch"
            />
            <div>
              <span className="eyebrow">
                0{index + 1} · {artist.role}
              </span>
              <h2>{artist.name}</h2>
              <p className="years">__ years of experience</p>
              <div className="tags">
                {artist.specialities.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <blockquote>“{artist.quote}”</blockquote>
              <div className="mini-portfolio">
                {[images.hair1, images.hair2, images.hair3, images.hair4].map(
                  (src, i) => (
                    <PlaceholderImage
                      src={src}
                      alt={`${artist.name} portfolio ${i + 1}`}
                      key={i}
                    />
                  ),
                )}
              </div>
              <ButtonLink
                to={`/visit?stylist=${encodeURIComponent(artist.name)}`}
              >
                Book with {artist.name}
              </ButtonLink>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export function BridalPage() {
  return (
    <div className="bridal-page">
      <section className="bridal-hero">
        <PlaceholderImage
          src={images.bridal1}
          alt="Indian bridal beauty portrait"
        />
        <div>
          <span className="eyebrow">Bridal & occasions</span>
          <h1>
            Your day.
            <br />
            <em>Your</em> face.
          </h1>
          <p>Made to feel like you, only more luminous.</p>
        </div>
      </section>
      <section className="section page-pad">
        <SectionHeader light number="01" label="The packages">
          <h2>
            Made around
            <br />
            <em>your day.</em>
          </h2>
        </SectionHeader>
        <div className="package-columns">
          {[
            ["Bridal", "Consultation", "Hair & makeup", "Draping", "Lashes"],
            [
              "Pre-Bridal",
              "Skin consultation",
              "Facial plan",
              "Waxing",
              "Manicure & pedicure",
            ],
            [
              "Party / Event",
              "Makeup",
              "Hair styling",
              "Lashes",
              "Finishing touches",
            ],
          ].map(([title, ...items]) => (
            <article key={title}>
              <span className="eyebrow">Package</span>
              <h3>{title}</h3>
              <ul>
                {items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <b>₹___</b>
              <ButtonLink
                light
                to={`/visit?service=${encodeURIComponent(title)}`}
              >
                Enquire
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>
      <section className="section page-pad">
        <SectionHeader light number="02" label="Bridal notes" />
        <div className="masonry">
          {[images.bridal2, images.bridal3, images.bridal4, images.bridal1].map(
            (src, i) => (
              <PlaceholderImage
                key={src}
                src={src}
                alt={`Bridal look ${i + 1}`}
              />
            ),
          )}
        </div>
      </section>
      <section className="section page-pad">
        <SectionHeader light number="03" label="How it works">
          <h2>
            Calm from first
            <br />
            call to final look.
          </h2>
        </SectionHeader>
        <div className="timeline">
          {["Consultation", "Trial", "Pre-bridal care", "The day"].map(
            (x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
              </div>
            ),
          )}
        </div>
      </section>
      <section className="section page-pad enquiry">
        <SectionHeader light number="04" label="Enquire">
          <h2>
            Tell us about
            <br />
            <em>the occasion.</em>
          </h2>
        </SectionHeader>
        <BookingForm enquiry="bridal" />
      </section>
    </div>
  )
}

const courses = [
  ["Professional Hair Cutting", "Beginner"],
  ["Hair Colour & Chemical Treatments", "Intermediate"],
  ["Makeup Artistry", "Beginner"],
  ["Skin & Beauty", "Beginner"],
  ["Nail Art", "All levels"],
]
export function AcademyPage() {
  return (
    <>
      <PageHero
        label="Farul Training Center"
        title={
          <>
            Learn the craft <em>from the chair</em>.
          </>
        }
        intro="Build confident hands, sound technique and the judgement that only comes from real salon experience."
      />
      <section className="section page-pad">
        <SectionHeader number="01" label="Courses">
          <h2>
            Training that
            <br />
            <em>gets practical.</em>
          </h2>
        </SectionHeader>
        <div className="course-list">
          {courses.map(([name, level], i) => (
            <div key={name}>
              <span>0{i + 1}</span>
              <h3>{name}</h3>
              <p>__ weeks · {level}</p>
              <b>₹___</b>
              <ButtonLink
                to={`/academy?service=${encodeURIComponent(name)}#enquire`}
              >
                Enquire
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>
      <section className="section academy-why page-pad">
        <SectionHeader light number="02" label="Why train with us">
          <h2>
            Less theory.
            <br />
            More <em>doing.</em>
          </h2>
        </SectionHeader>
        <div className="why-grid">
          {[
            [
              "01",
              "Real salon floor",
              "Learn in the rhythm and reality of a working salon.",
            ],
            [
              "02",
              "Small batches",
              "More feedback, more practice, more time at the chair.",
            ],
            [
              "03",
              "Certificate",
              "Leave with proof of training and a body of work.",
            ],
          ].map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="training-strip">
          <PlaceholderImage
            src={images.training}
            alt="Student practising salon technique"
          />
          <PlaceholderImage src={images.hero} alt="Hands-on hair training" />
          <PlaceholderImage
            src={images.team2}
            alt="Salon artist demonstrating technique"
          />
        </div>
      </section>
      <section id="enquire" className="section page-pad academy-form">
        <SectionHeader number="03" label="Enquire">
          <h2>
            Start with
            <br />
            <em>a conversation.</em>
          </h2>
        </SectionHeader>
        <BookingForm enquiry="academy" />
      </section>
    </>
  )
}

export function VisitPage() {
  return (
    <>
      <PageHero
        label="Visit & book"
        title={
          <>
            Your chair is <em>waiting</em>.
          </>
        }
        intro="Choose what you need. We'll confirm your request personally on WhatsApp."
      />
      <section className="section page-pad booking-page">
        <div>
          <SectionHeader number="01" label="Book a chair" />
          <BookingForm />
        </div>
        <aside>
          <span className="eyebrow">Farul · Dwarka Mor</span>
          <h2>Come find us.</h2>
          <p>{address}</p>
          <p>
            <strong>Landmark</strong>
            <br />
            Above CSD Bazaar
          </p>
          <p>
            <strong>Hours</strong>
            <br />
            Open daily from 8 AM
          </p>
          <a className="phone" href="tel:+919818465653">
            098184 65653
          </a>
          <Map />
        </aside>
      </section>
    </>
  )
}

function PageHero({
  label,
  title,
  intro,
}: {
  label: string
  title: React.ReactNode
  intro: string
}) {
  return (
    <section className="page-hero page-pad">
      <span className="eyebrow">{label}</span>
      <Reveal>
        <h1>{title}</h1>
      </Reveal>
      <p>{intro}</p>
    </section>
  )
}
