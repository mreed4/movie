const handler = async (event) => {
  const TOKEN = process.env.TOKEN;

  const url = "https://api.themoviedb.org/3/authentication/token/new";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
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
