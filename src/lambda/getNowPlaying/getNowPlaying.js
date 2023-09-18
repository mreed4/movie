// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  const TMDB_KEY = process.env.TMDB_KEY;

  const endpoint = "https://api.themoviedb.org/3/movie/now_playing";

  const searchOptions = [`page=1`, "language=en"].join("&");

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
};

module.exports = { handler };
