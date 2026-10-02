import { createBrowserRouter } from "react-router"
import { SiteLayout } from "../components"
import {
  AcademyPage,
  ArtistsPage,
  BridalPage,
  HomePage,
  ServicesPage,
  VisitPage,
} from "../pages"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "artists", Component: ArtistsPage },
      { path: "bridal", Component: BridalPage },
      { path: "academy", Component: AcademyPage },
      { path: "visit", Component: VisitPage },
      { path: "*", Component: HomePage },
    ],
  },
])
