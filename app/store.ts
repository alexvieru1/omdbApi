import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '@/features/movies/movieSlice';
import movieDetailsReducer from '@/features/movies/movieDetailsSlice';


export const store = configureStore({
    reducer: {
        movies: movieReducer,
        movieDetails: movieDetailsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;