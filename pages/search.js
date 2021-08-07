import { useRouter } from 'next/dist/client/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';

function Search({ resultsData }) {
  const router = useRouter();

  const { location, startDate, endDate, numberOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <>
      <Header inputTextPlace={`${location} | ${range} | ${numberOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays - {range} - for {numberOfGuests} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>

            <p className="button">Type of Place</p>

            <p className="button">Price</p>

            <p className="button">Rooms and Beds</p>

            <p className="button">More filters</p>
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
