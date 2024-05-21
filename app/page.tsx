"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import { MovieType } from "@/models/movie";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchMovies } from "@/features/movies/movieSlice";
import { useDispatch } from "@/hooks/useDispatch";
import Image from "next/image";
import Link from "next/link";

type Movie = Pick<MovieType, "imdbID" | "Poster" | "Title">;

export default function Home() {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  console.log(movies);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <NavBar />
          <HeroSection />
          <div className="m-10 grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {movies.map((movie, index) => (
              <motion.div
                key={index}
                className="flex flex-col justify-between items-center p-6 "
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 1, delay: 0.5 * index },
                }}
                viewport={{ once: true }}
              >
                {/* <Modal imdbID={movie.imdbID} moviePoster={movie.Poster} /> */}
                <Link href={`/movies/${movie.imdbID}`}>
                  <Image
                    className="rounded-lg glow-wrapper"
                    src={movie.Poster}
                    width={300}
                    height={500}
                    alt="poster"
                  />
                </Link>
                <div>
                  <p className="mt-2">{movie?.Title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
