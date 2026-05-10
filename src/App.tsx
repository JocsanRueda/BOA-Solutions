import BlurBackground from "@/components/blur-background";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
const ParticlesBackGround = lazy(() => import("@/components/particles-background"));
const GlowBackground = lazy(() => import("@/components/glow-background"));
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routeEnum } from "./common/enum/route.enum";
import { ActiveSectionProvider } from "./context/active-section.context";

import { AnimationSection } from "@/components/animation-section";
import HeroSection from "@/components/hero-section";

// Lazy-loaded components for below the fold
const AboutUs = lazy(() => import("@/pages/about-us"));
const Services = lazy(() => import("@/pages/services"));
const ContactPage = lazy(() => import("@/pages/contact"));
const FormPage = lazy(() => import("@/pages/form-page"));

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
        <LazyMotion features={domAnimation}>
          <ActiveSectionProvider>
            <Router basename="/">
              <BlurBackground />

              <Layout>

                <Routes>
                  <Route
                    path="/"
                    element={<AnimationSection sections={sections} />}
                  />
                  <Route 
                    path={routeEnum.FORM} 
                    element={
                      <Suspense fallback={<div className="min-h-screen w-full" />}>
                        <FormPage />
                      </Suspense>
                    } 
                  />
                </Routes>
              </Layout>
            </Router>
            <Suspense fallback={null}>
              <ParticlesBackGround />
              <GlowBackground />
            </Suspense>
          </ActiveSectionProvider>
        </LazyMotion>
      </ThemeProvider>
    </>
  );
}

export default App;