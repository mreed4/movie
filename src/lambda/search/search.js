async function handler(event) {
  const TMDB_KEY = process.env.TMDB_KEY;
  const { query: searchTerm, page } = event.queryStringParameters;

  const endpoint = "https://api.themoviedb.org/3/discover/movie";

  const searchOptions = [
    `with_text_query=${searchTerm}`,
    `include_adult=false`,
    `page=${page}`,
    `region=us`,
    `original_language=en`,
    `sort_by=popularity.desc`,
    `without_genres=16`,
  ].join("&");

  const URL = `${endpoint}?${searchOptions}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  };

  const response = await fetch(URL, options);
  const data = await response.json();

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify(response.statusText),
    };
  }

  try {
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
}

module.exports = { handler };
