import Cards from "@/components/cards";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function Search() {
  return (
    <div className="bg-black py-5 flex flex-col gap-15 text-white">
      <div className="relative w-[70%] h-[400px] m-auto">
        <Image
          alt="wall"
          layout="fill"
          objectFit="cover"
          unoptimized
          src="/images/210206.webp"
        />
        <div className="absolute w-full h-full flex flex-col gap-5 z-10 ps-5 pt-8 italic">
          <h1 className="font-bold lg:text-3xl md:text-2xl text-[17px] pe-1">
            Experience the Thrill of the Latest Blockbuster!
          </h1>
          <p className="max-w-[400px]">
            Dive into unforgettable cinematic journey with breathtaking visuals
            and an immersive storyline
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[70%] m-auto  gap-1.5">
        <label htmlFor="" className="text-2xl"> Discver Movies & series</label>
        <input className="max-w-[300px] border-2 border-white rounded-xl p-1" placeholder="Get Movies Suggestions" type="search" />
      </div>
      <Cards showChildren = {true} variant="trind">
        <div className="flex gap-12">
          <button >< ChevronLeftIcon className="h-10 w-10 cursor-pointer" /></button>
          <button>  < ChevronRightIcon className="h-10 w-10 cursor-pointer" /></button>
        </div>
      </Cards>
    </div>
  );
}
export default Search;
