import Head from "next/head";
import Footer from "../components/footer/Footer";
import Nav from '../components/navbar/Nav'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vehicle Network</title>
        <meta
          name="description"
          content="Vehicle Network is a car renting system between users."
        />
        <link rel="icon" href="/logo.jpg" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/> */}
      </Head>

      <Nav /> 

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
 
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
