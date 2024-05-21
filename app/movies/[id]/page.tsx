"use client";
import { RootState } from "@/app/store";
import Loading from "@/components/Loading";
import { useDispatch } from "@/hooks/useDispatch";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchMovieById } from "@/features/movies/movieDetailsSlice";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock } from "lucide-react";

const MoviePage = () => {
  const params = useParams();
  const imdbID = params.id as string;


  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.movieDetails.data);
  const loading = useSelector((state: RootState) => state.movieDetails.loading);


  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieById(imdbID));
    }
  }, [dispatch, imdbID]);


  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col m-5">
      <div className="flex justify-center items-center">
        <Image
          className="rounded-lg"
          src={movie?.Poster as string}
          width={400}
          height={600}
          alt="poster"
        />
      </div>
      <div className="flex flex-row justify-between p-6">
        <div className="flex flex-row justify-end items-center">
          <CalendarDays size={20} className="text-slate-600" />
          <p className="text-md ml-2 text-slate-600">{movie?.Released}</p>
        </div>
        <div className="text-3xl font-semibold">
          <h1>{movie?.Title}</h1>
        </div>
        <div className="flex flex-row justify-start items-center">
          <Clock size={20} className="text-slate-600" />
          <p className="text-md ml-2 italic text-slate-600">{movie?.Runtime}</p>
        </div>
      </div>
      <div className="my-2">
        <Label className="text-2xl justify-start">Description:</Label>
        <p>{movie?.Plot}</p>
      </div>
      <div className="my-2">
        <Label className="text-2xl justify-start">Director(s):</Label>
        <p>{movie?.Director}</p>
      </div>
      <div className="my-2">
        <Label className="text-2xl justify-start">Writer(s):</Label>
        <p>{movie?.Writer}</p>
      </div>
      <div className="my-2">
        <Label className="text-2xl justify-start">Actors:</Label>
        <p>{movie?.Actors}</p>
      </div>
      <div className="my-2">
        <Label className="text-2xl justify-start">Rating:</Label>
        <p>{movie?.imdbRating}/10</p>
      </div>
      <div className="my-2">
        <Label className="text-2xl justify-start">Awards:</Label>
        <p>{movie?.Awards}</p>
      </div>
      <div className="my-2">
        <Label className="text-2xl justify-start">Box Office:</Label>
        <p>{movie?.BoxOffice}</p>
      </div>
    </div>
  );
};

export default MoviePage;
