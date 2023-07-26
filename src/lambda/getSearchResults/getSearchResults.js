const handler = async (event) => {
  const TOKEN = process.env.TOKEN;
  const { query: searchTerm } = event.queryStringParameters;

  const URL = `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await fetch(URL, options);
  const data = await response.json();

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: response.statusText,
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
