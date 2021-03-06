import { useRouter } from 'next/dist/client/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from './../components/Map';
import Head from 'next/head';

function Search({ resultsData }) {
  const router = useRouter();

  const { location, startDate, endDate, numberOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <>
      <Head>
        <title>{`Search | ${location}`}</title>
      </Head>
      <Header inputTextPlace={`${location} | ${range} | ${numberOfGuests}`} />
      <main className="flex flex-col lg:flex-row mb-8">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays - {range} - for {numberOfGuests} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
            <p className="button shadow-md">Cancellation Flexibility</p>

            <p className="button shadow-md">Type of Place</p>

            <p className="button shadow-md">Price</p>

            <p className="button shadow-md">Rooms and Beds</p>

            <p className="button shadow-md">More filters</p>
          </div>

          <div className="flex flex-col">
            {resultsData.map(item => (
              <InfoCard
                key={item.img}
                img={item.img}
                location={item.location}
                title={item.title}
                description={item.description}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>
        <section className="max-w-[300px] lg:min-w-[600px] mx-auto h-96 mt-5 lg:sticky top-32 bg-blue-400">
          <Map resultsData={resultsData} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz');
  const resultsData = await searchResults.json();

  return {
    props: {
      resultsData,
    },
  };
}
