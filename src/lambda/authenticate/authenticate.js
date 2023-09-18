const handler = async (event) => {
  const TMDB_KEY = process.env.TMDB_KEY;

  const url = "https://api.themoviedb.org/3/authentication/token/new";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

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
