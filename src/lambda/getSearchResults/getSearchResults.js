const handler = async (event) => {
  const { s: searchTerm, page } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;
  const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=movie&page=${page}`;

  const response = await fetch(URL);

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: response.statusText,
    };
  }

  const data = await response.json();

  const { Search: searchResults } = data;

  return {
    statusCode: 200,
    body: JSON.stringify(searchResults),
  };
};

module.exports = { handler };
