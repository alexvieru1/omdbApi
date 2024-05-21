import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const imdbId = req.nextUrl.searchParams.get('imdbId');

  if (!imdbId) {
    return new NextResponse(JSON.stringify({ message: "IMDb ID is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const url = `http://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&plot=full&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || 'Unable to fetch movie data');
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
