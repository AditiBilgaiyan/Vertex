import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Courses from '../components/Courses';
import AITutor from '../components/AITutor';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="app-page">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Features />
        <Courses />
        <AITutor />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
