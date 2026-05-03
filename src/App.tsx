import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import BlurBackground from "@/components/blur-background";
import GlowBackground from "@/components/glow-background";
import Layout from "@/components/layout";
import ParticlesBackGround from "@/components/particles-background";
import { ThemeProvider } from "@/components/theme-provider";
import { routeEnum } from "./common/enum/route.enum";
import { ActiveSectionProvider } from "./context/active-section.context";
import Loader from "@/components/loader";

// Lazy-loaded components
const HeroSection = lazy(() => import("@/components/hero-section"));
const AboutUs = lazy(() => import("@/pages/about-us"));
const Services = lazy(() => import("@/pages/services"));
const ContactPage = lazy(() => import("./pages/contact"));
const AnimationSection = lazy(() => import("./components/animation-section"));

function App() {
  const sections = [
    { url: routeEnum.HOME, component: <HeroSection /> },
    { url: routeEnum.ABOUT_US, component: <AboutUs /> },
    { url: routeEnum.SERVICES, component: <Services /> },
    { url: routeEnum.CONTACT, component: <ContactPage /> },
  ];

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <ActiveSectionProvider>
          <Router basename="/">
            <BlurBackground />

            <Layout>

              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route
                    path="/"
                    element={<AnimationSection sections={sections} />}
                  />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
          <ParticlesBackGround />
          <GlowBackground />
        </ActiveSectionProvider>
      </ThemeProvider>
    </>
  );
}

export default App;