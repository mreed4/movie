const handler = async (event) => {
  const { i: movieId } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;
  const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`;

  const response = await fetch(URL);

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: response.statusText,
    };
  }

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

module.exports = { handler };
