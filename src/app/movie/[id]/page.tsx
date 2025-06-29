"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PhotoIcon,
  PlayCircleIcon,
  PlayIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import Header from "@/components/header";
import Cards from "@/components/cards";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export default function MovieDetails() {
  const { id } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setLoading(false);
      });
  }, [API_KEY, id]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!movie) return <p className="text-white text-center">Movie not found</p>;

  return (
    <div className="bg-black pb-5">
      <Header/>
      <div className=" flex-col text-gray-400 lg:w-[80%] w-[90%] m-auto lg:px-5 px-1.5 py-5 lg:text-lg text-sm">
       <h1 className="pb-1 ps-2"> {movie.title}</h1>

        <div className="flex lg:justify-between md:justify-between justify-around">
          <div className="flex lg:flex-row md:flex-row flex-col gap-5">
            <div className="relative lg:w-[400px] md:w-[200px]  sm:w-[300px] w-[100%] h-[200px] md:m-auto lg:h-full md:h-full">
              <Image
                layout="fill"
                unoptimized
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="mDETAIL"
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="lg:max-w-[450px] md:max-w-[400px] sm:max-w-[300px] max-w-[230px] pe-3">{movie.overview}</p>
              <p>⭐{movie.vote_average}</p>
              <span className="flex items-center gap-5 m-auto w-fit">
                <p className="lg:text-2xl">Play The Show</p>
                <button><PlayIcon className="w-10 h-10 text-white cursor-pointer" /></button>
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-around">
            <button className="cursor-pointer flex flex-col items-center text-center gap-2">
              <DocumentTextIcon className="lg:w-10 lg:h-10 w-8 h-8 text-gray-400" />
              <span className="text-gray-400">Over veiw</span>
            </button>
            <button className="cursor-pointer flex flex-col items-center gap-2">
              <UserGroupIcon className="lg:w-10 lg:h-10 w-8 h-8 text-gray-400" />
              <span className="text-gray-400">Cast</span>
            </button>
            <button className="cursor-pointer flex flex-col items-center gap-2">
              <PhotoIcon className="lg:w-10 lg:h-10 w-8 h-8 text-gray-400" />
              <span className="text-gray-400">Photos</span>
            </button>
            <button className="cursor-pointer flex flex-col items-center gap-2">
              <PlayCircleIcon className="lg:w-10 lg:h-10 w-8 h-8 text-gray-400" />
              <span className="text-gray-400">Vedios</span>
            </button>
            <button className="cursor-pointer flex flex-col items-center gap-2">
              <ChatBubbleLeftRightIcon className="lg:w-10 lg:h-10 w-8 h-8 text-gray-400" />
              <span className="text-gray-400">Reviews</span>
            </button>
          </div>
        </div>
      </div>
      <Cards variant="similar"/>
    </div>
  );
}








