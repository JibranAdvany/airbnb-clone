import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({ nearbyData, anywhereData }) {
  return (
    <>
      <Head>
        <title>Air BnB Clone</title>
      </Head>

      {/* Header */}
      <Header />

      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        {/* Cards */}
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {nearbyData.map(item => (
              <SmallCard
                key={item.location}
                image={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live anywhere!</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {anywhereData.map(item => (
              <MediumCard key={item.img} img={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          buttonText="Get Inspired"
        />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp');
  const nearbyData = await exploreData.json();

  const anywhereDataRaw = await fetch('https://links.papareact.com/zp1');
  const anywhereData = await anywhereDataRaw.json();

  return {
    props: {
      nearbyData,
      anywhereData,
    },
  };
}
