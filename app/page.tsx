"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await fetch("/api/movies", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setMovies(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // console.log(data);
    }

    loadMovies();
  }, []);

  // console.log(movies);
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
                <Modal imdbID={movie.imdbID} moviePoster={movie.Poster} />
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
