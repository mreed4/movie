const handler = async (event) => {
  const { s: searchTerm, page } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;
  const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=movie&page=${page}`;

  try {
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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

module.exports = { handler };
