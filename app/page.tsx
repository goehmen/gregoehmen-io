import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import BookCall from './components/BookCall';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <BookCall />
      <Footer />
    </main>
  );
}