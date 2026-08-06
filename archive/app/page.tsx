import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Characters from "./components/Characters";
import RelationshipMap from "./components/RelationshipMap";
import Lore from "./components/Lore";
import Chapters from "./components/Chapters";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <Story />
        <div className="divider" />
        <Characters />
        <div className="divider" />
        <RelationshipMap />
        <div className="divider" />
        <Lore />
        <div className="divider" />
        <Chapters />
      </main>
      <Footer />
    </>
  );
}
