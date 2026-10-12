import { Nav, Hero } from '@/components/Top';
import Replay from '@/components/Replay';
import Products from '@/components/Products';
import Reveals from '@/components/Reveals';
import { Proof, Juni, Pricing, Faq, Final, Footer } from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Reveals />
      <Nav />
      <main id="main">
        <Hero />
        <Replay />
        <Products />
        <Proof />
        <Juni />
        <Pricing />
        <Faq />
        <Final />
      </main>
      <Footer />
    </>
  );
}
