import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { MovieType } from "@/models/movie";

interface MovieState {
  movies: MovieType[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk<
  MovieType[],
  void,
  { rejectValue: string }
>("movies/fetchMovies", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/movies", { method: "GET" });
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data: MovieType[] = await response.json();
    return data;
  } catch (error : any) {
    return rejectWithValue(error.message);
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<MovieType[]>) => {
          state.movies = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchMovies.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch movies";
        }
      );
  },
});

export default movieSlice.reducer;
