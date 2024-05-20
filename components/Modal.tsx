"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock, Star } from "lucide-react";

interface ModalProps {
  imdbID: string;
  moviePoster: string;
}

interface ImdbMovie {
  Title: string;
  Released: string;
  Runtime: string;
  Plot: string;
  Director: string;
  Writer: string;
  Actors: string;
  imdbRating: string;
  Awards: string;
  BoxOffice: string;
}

const Modal: React.FC<ModalProps> = ({ imdbID, moviePoster }) => {
  const [imdbMovie, setImdbMovie] = useState<ImdbMovie | null>(null);

  const fetchMovieDetails = async (imdbID: string) => {
    try {
      const response = await fetch(`/api/movie?imdbId=${imdbID}`);
      if (!response.ok) {
        throw new Error(
          `HTTP status ${response.status}: ${response.statusText}`
        );
      }
      const movieDetails = await response.json();
      setImdbMovie(movieDetails);
      // console.log(movieDetails);
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div onClick={() => fetchMovieDetails(imdbID)}>
          <Image
            className="rounded-lg glow-wrapper"
            src={moviePoster}
            width={300}
            height={500}
            alt="poster"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[390px]">
        <DialogHeader>
          <DialogTitle>{imdbMovie?.Title}</DialogTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-end items-center">
              <CalendarDays size={16} className="text-slate-600" />
              <p className="text-sm ml-2 text-slate-600">
                {imdbMovie?.Released}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center">
              <Clock size={16} className="text-slate-600" />
              <p className="text-sm ml-2 italic text-slate-600">
                {imdbMovie?.Runtime}
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-4">
          <Label>Description:</Label>
          <DialogDescription>{imdbMovie?.Plot}</DialogDescription>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Label>Director(s):</Label>
          <DialogDescription>{imdbMovie?.Director}</DialogDescription>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Label>Writer(s):</Label>
          <DialogDescription>{imdbMovie?.Writer}</DialogDescription>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Label>Actors:</Label>
          <DialogDescription>{imdbMovie?.Actors}</DialogDescription>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Label>Rating:</Label>
          <div className="flex flex-row items-center">
            <Star size={16} className="mr-2" />
            <DialogDescription>{imdbMovie?.imdbRating}/10</DialogDescription>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Label>Awards:</Label>
          <DialogDescription>{imdbMovie?.Awards}</DialogDescription>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Label>Box Office:</Label>
          <DialogDescription>{imdbMovie?.BoxOffice}</DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
