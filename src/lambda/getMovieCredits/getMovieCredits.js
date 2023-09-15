// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
async function handler(event) {
  const TOKEN = process.env.TOKEN;
  const { id: movie_id } = event.queryStringParameters;

  const endpoint = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;

  const searchOptions = [`language=en`].join("&");

  const URL = `${endpoint}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
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

  console.log(data);

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
