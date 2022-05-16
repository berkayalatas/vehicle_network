import Head from "next/head";
import Footer from "../components/footer/Footer";
import Nav from "../components/navbar/Nav";
import Banner from "../components/banner/Banner";
import HowItWorks from "../components/about/HowItWorks";
import About from "../components/about/About";
import LocationSection from "../components/locations/LocationSection";
import Link from "next/link";
import PopularCars from "../components/popularCars/PopularCars";

export default function Home({ locationData }) {
  return (
    <div>
      <Head>
        <title>Vehicle Network</title>
        <meta
          name="description"
          content="Vehicle Network is a car renting system between users."
        />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <Link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Nav />

      <main>
        <Banner />
        <HowItWorks />
        <About />
        <LocationSection locationData={locationData} />
        <PopularCars />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  //Fetch location data
  const locationData = await fetch("https://jsonkeeper.com/b/95S7")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      locationData,
    },
  };
}
