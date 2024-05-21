import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { MovieType } from "@/models/movie";

interface MovieState {
  data: MovieType | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchMovieById = createAsyncThunk<
  MovieType,
  string,
  { rejectValue: string }
>("movieDetails/fetchById", async (imdbID, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/movie?imdbId=${imdbID}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.Error || "Failed to fetch movie details");
    }
    const data: MovieType = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovieById.fulfilled,
        (state, action: PayloadAction<MovieType>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchMovieById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch movie details";
        }
      );
  },
});

export default movieDetailsSlice.reducer;
