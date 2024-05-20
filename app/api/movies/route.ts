import { NextRequest, NextResponse } from 'next/server';

type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

async function fetchMovies(page: number, apiKey: string): Promise<Movie[]> {
    const url = `http://www.omdbapi.com/?s=movie&type=movie&apikey=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status} - ${data.Error}`);
    }
    return data.Search;
}

// GET for 100 movies
export async function GET(req: NextRequest) {
    const apiKey = process.env.OMDB_API_KEY as string;
    const totalMovies = [];
    try {
        for (let page = 1; page <= 10; page++) {
            const movies = await fetchMovies(page, apiKey);
            totalMovies.push(...movies);
            if (totalMovies.length >= 100) break;
        }
        return new NextResponse(JSON.stringify(totalMovies.slice(0, 100)), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        return new NextResponse(JSON.stringify({ message: 'Failed to fetch movies'}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
