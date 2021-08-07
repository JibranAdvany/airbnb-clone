import Image from 'next/image';

const MediumCard = ({ img, title }) => {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out shadow-md rounded-xl">
      <div className="relative h-80 w-80">
        <Image src={img} layout="fill" className="rounded-xl" />
      </div>
      <h3 className="text-2xl mt-3 ml-2 pb-2">{title}</h3>
    </div>
  );
};

export default MediumCard;
