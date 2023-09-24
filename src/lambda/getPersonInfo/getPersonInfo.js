async function handler(event) {
  const TMDB_KEY = process.env.TMDB_KEY;
  const { id: person_id } = event.queryStringParameters;

  const endpoint = `https://api.themoviedb.org/3/person/${person_id}`;

  const searchOptions = [`language=en`].join("&");

  const URL = `${endpoint}?${searchOptions}`;

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
