async function handler(event) {
  const TMDB_KEY = process.env.TMDB_KEY;
  const { id: movie_id } = event.queryStringParameters;

  const endpoint = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;

  const searchOptions = [`language=en`].join("&");

  const URL = `${endpoint}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  };

  const response = await fetch(URL, options);

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: response.statusText,
    };
  }

  const data = await response.json();

  // console.log(data);

  try {
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

module.exports = { handler };
