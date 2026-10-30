import Ocean from './components/ambient/Ocean';
import BubbleCursor from './components/ambient/BubbleCursor';
import Effects from './components/ambient/Effects';
import Intro from './components/ambient/Intro';
import FishSchool from './components/ambient/FishSchool';
import Marquee from './components/ui/Marquee';
import DynamicIsland from './components/nav/DynamicIsland';
import DepthGauge from './components/nav/DepthGauge';
import Spotlight from './components/nav/Spotlight';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Medals from './components/sections/Medals';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import { useActiveSectionTracker } from './lib/scroll';
import { useGlassSpotlight } from './lib/fx';

function App() {
    useActiveSectionTracker();
    useGlassSpotlight();

    return (
        <>
            <Intro />
            <Ocean />
            <FishSchool />
            <DynamicIsland />
            <DepthGauge />
            <main id="main">
                <Hero />
                <Marquee
                    top={['Full-Stack', 'Mobile', 'AI / ML', 'Swimmer', 'Anime fan']}
                    bottom={['React', 'React Native', 'Node', 'FastAPI', 'Next.js', 'Python']}
                />
                <About />
                <Skills />
                <Experience />
                <Marquee top={['Build', 'Ship', 'Break', 'Fix', 'Repeat']} />
                <Projects />
                <Medals />
                <Marquee
                    top={["Let's build something", 'Say hi', 'Open to work']}
                    bottom={['Internships', 'Freelance', 'Collabs', 'Hackathons']}
                />
                <Contact />
                <Footer />
            </main>
            <Spotlight />
            <Effects />
            <BubbleCursor />
        </>
    );
}

export default App;
