async function handler(event) {
  const OMDB_KEY = process.env.OMDB_KEY;
  const { imdb_id } = event.queryStringParameters;

  const URL = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdb_id}`;
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
}

module.exports = { handler };
