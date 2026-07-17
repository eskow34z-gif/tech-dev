import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Expertise } from "@/components/sections/expertise";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Projects />
        <Testimonials />
        <Expertise />
        <Process />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
