import Image from 'next/image';
import grünStringer from '../public/1-Green Fitness Stringer.jpg';
import rosa from '../public/2-Pink Water Bottle.jpg';
import grünJogger from '../public/3-Green Joggers.jpg';
import blauJogger from '../public/4-Blue Joggers.jpg';
import weißShirt from '../public/5-White Performance Shirt.jpg';
import grauBag from '../public/6-Grey Bag.jpg';

export default function NewArrival() {
  return (
    <>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
          <Image src={grünStringer} alt="guy with green muscleshirt" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-400">
          <Image src={rosa} alt="lady with pink water bottle" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
          <Image src={grünJogger} alt="guy with green Joggers" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-400">
          <Image src={blauJogger} alt="guy with blue joggers" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-500">
          <Image src={weißShirt} alt="guy with white performance shirt" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-400">
          <Image src={grauBag} alt="guy with grey bag" />
        </div>
      </div>
    </>
  );
}
