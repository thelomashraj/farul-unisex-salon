import { motion, useScroll, useSpring } from "framer-motion"
import {
  CSSProperties,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router"
import { address, images, services } from "./data"

const nav = [
  ["Services", "/services"],
  ["Artists", "/artists"],
  ["Bridal", "/bridal"],
  ["Academy", "/academy"],
  ["Visit", "/visit"],
]

export function ButtonLink({
  to,
  children,
  light = false,
}: {
  to: string
  children: ReactNode
  light?: boolean
}) {
  return (
    <Link className={light ? "button button-light" : "button"} to={to}>
      {children}
    </Link>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location])
  return (
    <header className={open ? "nav is-open" : "nav"}>
      <Link to="/" className="wordmark">
        FARUL
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        {nav.map(([label, href]) => (
          <NavLink key={href} to={href}>
            {label}
          </NavLink>
        ))}
      </nav>
      <ButtonLink to="/visit">Book a Chair</ButtonLink>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="eyebrow">Farul · Dwarka Mor</span>
          {nav.map(([label, href], index) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <Link to={href}>{label}</Link>
            </motion.div>
          ))}
          <a href="tel:+919818465653">098184 65653</a>
        </motion.div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <span className="eyebrow">Find us</span>
          <p>{address}</p>
          <p>Above CSD Bazaar</p>
        </div>
        <div>
          <span className="eyebrow">Talk to us</span>
          <a href="tel:+919818465653">098184 65653</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </div>
        <div>
          <span className="eyebrow">Explore</span>
          {nav.map(([label, href]) => (
            <Link key={href} to={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-wordmark">FARUL</div>
      <div className="footer-legal">
        © Farul Unisex Salon & Training Center{" "}
        <span>Dwarka Mor · New Delhi</span>
      </div>
    </footer>
  )
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 })
  const [active, setActive] = useState(false)
  useEffect(() => {
    const move = (event: MouseEvent) =>
      setPos({ x: event.clientX, y: event.clientY })
    const over = (event: MouseEvent) =>
      setActive(
        Boolean((event.target as HTMLElement).closest("a, button, img")),
      )
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
    }
  }, [])
  return (
    <div
      className={`cursor ${active ? "is-active" : ""}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    />
  )
}

export function SiteLayout() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <CustomCursor />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <div className="mobile-bottom">
        <a href="tel:+919818465653">Call</a>
        <a href="https://wa.me/919818465653">WhatsApp</a>
      </div>
    </>
  )
}

export function SectionHeader({
  number,
  label,
  children,
  light = false,
}: {
  number: string
  label: string
  children?: ReactNode
  light?: boolean
}) {
  return (
    <div className={`section-header ${light ? "light" : ""}`}>
      <span className="eyebrow">
        {number} — {label}
      </span>
      {children}
    </div>
  )
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PlaceholderImage({
  src,
  alt,
  className = "",
  style,
}: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <figure className={`image-wrap ${className}`} style={style}>
      <img src={src} alt={alt} />
      <figcaption>Placeholder · replace with salon photo</figcaption>
    </figure>
  )
}

export function MarqueeStrip() {
  const line =
    "Balayage · Hair Spa · Smoothening · Bridal Makeup · Brow Lamination · Lash Lift · Facials · Men's Grooming · Hair Colour · Manicure & Pedicure · "
  return (
    <div className="marquee" aria-label={line}>
      <div>
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  )
}

export function BeforeAfterSlider() {
  const [value, setValue] = useState(50)
  const [tab, setTab] = useState("Colour")
  return (
    <div>
      <div className="work-tabs">
        {["Colour", "Smoothening", "Hair Spa"].map((item) => (
          <button
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="before-after">
        <img src={images.hair2} alt={`${tab} before placeholder`} />
        <div className="after" style={{ clipPath: `inset(0 0 0 ${value}%)` }}>
          <img src={images.hair1} alt={`${tab} after placeholder`} />
        </div>
        <span className="ba-label before-label">Before</span>
        <span className="ba-label after-label">After</span>
        <div className="handle" style={{ left: `${value}%` }}>
          <span>↔</span>
        </div>
        <input
          aria-label="Drag to compare before and after"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <small>Placeholder imagery · replace with real client results</small>
      </div>
    </div>
  )
}

export function ReviewCard({ quote, name }: { quote: string; name: string }) {
  return (
    <article className="review-card">
      <div className="stars">★★★★★</div>
      <blockquote>“{quote}”</blockquote>
      <p>
        {name} <span>Google review</span>
      </p>
    </article>
  )
}

const allServices = Object.values(services).flat()
export function BookingForm({ enquiry }: { enquiry?: "bridal" | "academy" }) {
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    service:
      params.get("service") ||
      (enquiry === "academy"
        ? "Professional Hair Cutting"
        : enquiry === "bridal"
          ? "Bridal makeup"
          : ""),
    stylist: params.get("stylist") || "Any available",
    date: "",
    time: "",
    name: "",
    phone: "",
    message: "",
  })
  const update = (key: string, value: string) =>
    setForm((current) => ({ ...current, [key]: value }))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = enquiry
      ? `Hi Farul! I'd like to enquire about ${form.service}. Name: ${form.name}, Phone: ${form.phone}.${
          form.date ? ` Preferred date: ${form.date}.` : ""
        }${form.message ? ` Message: ${form.message}` : ""}`
      : `Hi Farul! I'd like to book: ${form.service} with ${form.stylist} on ${form.date} at ${form.time}. Name: ${form.name}, Phone: ${form.phone}.`
    window.open(
      `https://wa.me/919818465653?text=${encodeURIComponent(text)}`,
      "_blank",
    )
  }
  const timeSlots = [
    "8 AM",
    "10 AM",
    "12 PM",
    "2 PM",
    "4 PM",
    "6 PM",
    "8 PM",
    "9 PM",
  ]
  return (
    <form className="booking-form" onSubmit={submit}>
      <label>
        <span>01 · {enquiry ? "Course / service" : "Service"}</span>
        <select
          required
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
        >
          <option value="">Choose a service</option>
          {enquiry === "academy"
            ? [
                "Professional Hair Cutting",
                "Hair Colour & Chemical Treatments",
                "Makeup Artistry",
                "Skin & Beauty",
                "Nail Art",
              ].map((x) => <option key={x}>{x}</option>)
            : allServices.map((x) => <option key={x}>{x}</option>)}
        </select>
      </label>
      {!enquiry && (
        <label>
          <span>02 · Stylist (optional)</span>
          <select
            value={form.stylist}
            onChange={(e) => update("stylist", e.target.value)}
          >
            <option>Any available</option>
            <option>Md Riyaz</option>
            <option>Afsar</option>
          </select>
        </label>
      )}
      <label>
        <span>
          {enquiry ? "02" : "03"} ·{" "}
          {enquiry === "bridal" ? "Wedding date" : "Date"}
        </span>
        <input
          required={!enquiry}
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
        />
      </label>
      {!enquiry && (
        <fieldset>
          <legend>04 · Time</legend>
          <div className="time-slots">
            {timeSlots.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => update("time", time)}
                className={form.time === time ? "selected" : ""}
              >
                {time}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <div className="form-pair">
        <label>
          <span>{enquiry ? "03" : "05"} · Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          <span>Phone</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91"
          />
        </label>
      </div>
      {enquiry && (
        <label>
          <span>Message</span>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us a little more"
            rows={4}
          />
        </label>
      )}
      <button className="button submit" type="submit">
        {enquiry ? "Send enquiry on WhatsApp" : "Request on WhatsApp"} →
      </button>
    </form>
  )
}

export function Map() {
  return (
    <iframe
      className="map"
      title="Farul Salon location map"
      loading="lazy"
      src="https://www.google.com/maps?q=Pillar%20No.%20789%20Dwarka%20Mor%20New%20Delhi&output=embed"
    />
  )
}
