import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/ui/ScrollToTop';

import CustomCursor from './components/ui/CustomCursor';

function App() {
  return (
    <Layout>
      <CustomCursor />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <ScrollToTop />
    </Layout>
  );
}

export default App;
