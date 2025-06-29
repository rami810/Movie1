

"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "../app/page.module.css";
import { useRouter } from "next/navigation";

interface movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}
interface CardsProps {
  variant: string;
  children?: React.ReactNode;
  showChildren?: boolean;
}
function Cards({ variant, showChildren = false, children }: CardsProps) {
  const router = useRouter();

  const [movies, setMovies] = useState<movie[]>([]);

  const movieChunks = useMemo(() => {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < movies.length; i += chunkSize) {
      chunks.push(movies.slice(i, i + chunkSize));
    }
    return chunks;
  }, [movies]);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(API_URL)
      .then((Response) => Response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);
  return variant === "trind" ? (
    <div className="mx-5 text-white">
      <h1 className=" lg:text-5xl rounded-2xl flex justify-evenly py-10 bg-zinc-900">
        Trinding Movies
        {showChildren && children}
      </h1>
      <div className={`overflow-x-scroll bg-zinc-800 p-2 ${styles.noBar}`}>
        <div className="flex flex-row lg:gap-3 gap-1.5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-fit bg-black  text-center flex flex-col gap-3 p-2 rounded-3xl cursor-pointer"
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <div className="lg:w-[200px] lg:h-[200px] w-[130px] h-[130px]  relative ">
                <Image
                  alt="card"
                  layout="fill"
                  unoptimized
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="rounded-2xl"
                />
              </div>
              <h1 className="lg:text-lg text-sm">{movie.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : variant === "recommend" ? (
    <div className="lg:w-[60%] w-[90%] flex flex-col gap-2 m-auto mb-10 text-white">
      <h1>ALL-Recommended Movies</h1>

      <div
        className={` flex  overflow-x-scroll lg:text-lg text-sm  ${styles.noBar}`}
      >
        <div className="flex gap-4">
          {movieChunks.map((chunk, index) => (
            <div
              key={index}
              className="grid grid-rows-2 grid-cols-2 gap-4 flex-shrink-0 "
            >
              {chunk.map((movie) => (
                <div
                  key={movie.id}
                  className="flex gap-2 bg-zinc-900 p-2 lg:flex-row flex-col rounded-xl  lg:w-[450px] w-[150px] cursor-pointer"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <div className="lg:w-[150px] lg:h-[120px] w-[100%] h-[100px] relative">
                    <Image
                      layout="fill"
                      unoptimized
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="cardd"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col lg:gap-5 gap-1.5 flex-1 justify-center text-center lg:items-end items-center">
                    <h1>{movie.title}</h1>
                    <p>{movie.vote_average}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : variant === "similar" ? (
    <div className="w-[80%] m-auto text-white mt-4 ">
      <h1 className="text-5xl w-fit m-auto pt-2 pb-10">Similar Movies</h1>
      <div className={`overflow-x-auto  ${styles.noBar} `}>
        <div className="flex gap-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-zinc-800 cursor-pointer text-center rounded-2xl w-[250px] h-[200px]  flex gap-2 justify-between flex-col flex-shrink-0 p-2"
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <div>
                <h1>{movie.title}</h1>
              </div>
              <div className="relative w-[100%] h-[150px]  ">
                <Image
                  layout="fill"
                  unoptimized
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="similarCD"
                  className="rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
export default Cards;

