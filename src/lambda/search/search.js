async function handler(event) {
  const TOKEN = process.env.TOKEN;
  const { query: searchTerm, page } = event.queryStringParameters;

  const endpoint = "https://api.themoviedb.org/3/search/movie";
  const endpoint2 = "https://api.themoviedb.org/3/discover/movie";

  const searchOptions = [`query=${searchTerm}`, `include_adult=false`, `page=${page}`, "language=en"].join("&");
  const searchOptions2 = [
    `with_text_query=${searchTerm}`,
    `include_adult=false`,
    `page=${page}`,
    `region=us`,
    `original_language=en`,
    `sort_by=popularity.desc`,
    `without_genres=16`,
  ].join("&");

  const URL = `${endpoint}?${searchOptions}`;
  const URL2 = `${endpoint2}?${searchOptions2}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await fetch(URL2, options);
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
