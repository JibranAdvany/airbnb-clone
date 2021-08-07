import Image from 'next/image';
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

const Header = ({ inputTextPlace }) => {
  const [inputText, setInputText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const router = useRouter();

  const handleSelect = ranges => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setInputText('');
    setGuests(1);
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: inputText,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests: guests,
      },
    });
    resetInput();
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Logo */}
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => router.push('/')}
      >
        <Image
          src="/Airbnb_Logo_Bélo.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Search */}
      <div className="flex items-center md:border-2 rounded-full md:shadow-sm">
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          type="text"
          placeholder={inputTextPlace ? inputTextPlace : 'Start your search'}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* Actions */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden lg:inline">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-0 sm:space-x-2 border-2 p-0 md:p-2 rounded-full flex-col sm:flex-row">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Render Calender */}
      {inputText && (
        <div className="flex flex-col col-span-3 mx-auto mt-1 shadow-md overflow-scroll scrollbar-hide max-w-full">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#fd5861']}
            onChange={handleSelect}
            // className="max-w-[300px]"
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UserCircleIcon className="h-5" />
            <input
              value={guests}
              onChange={e => setGuests(e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 outline-none text-lg text-red-400"
            />
          </div>
          <div className="flex justify-between py-2">
            <button
              className="mx-auto text-gray-500 hover:bg-red-400 block py-2 px-4 rounded-md hover:text-white transition duration-150 ease-out"
              onClick={resetInput}
            >
              Cancel
            </button>
            <button
              className="mx-auto text-red-400 hover:bg-red-400 block py-2 px-4 rounded-md hover:text-white transition duration-150 ease-out"
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
