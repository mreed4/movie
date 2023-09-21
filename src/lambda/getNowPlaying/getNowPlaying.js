async function handler(event) {
  const TMDB_KEY = process.env.TMDB_KEY;

  const dateToday = new Date();
  const dateTodayString = dateToday.toISOString().split("T")[0];
  // const dateSixWeeksAgo = new Date(dateToday.setDate(dateToday.getDate() - 42)).toISOString().split("T")[0];
  const dateTwoMonthsAgo = new Date(dateToday.setDate(dateToday.getDate() - 60)).toISOString().split("T")[0];
  // const dateOneMonthAgo = new Date(dateToday.setDate(dateToday.getDate() - 30)).toISOString().split("T")[0];
  // const dateThreeMonthsAgo = new Date(dateToday.setDate(dateToday.getDate() - 90)).toISOString().split("T")[0];

  // console.log(dateTodayString, dateSixWeeksAgo);

  // const endpoint = "https://api.themoviedb.org/3/movie/now_playing";
  const endpoint = "https://api.themoviedb.org/3/discover/movie";

  const searchOptions = [
    `page=1`,
    "language=en-US",
    "sort_by=popularity.desc",
    // "sort_by=primary_release_date.desc",
    "include_adult=false",
    "include_video=false",
    `primary_release_date.gte=${dateTwoMonthsAgo}`,
    `primary_release_date.lte=${dateTodayString}`,
    "region=us",
    "watch_region=us",
    "wtih_original_language=en",
    "with_release_type=1|3", // 1 = premiere, 3 = theatrical
    "with_runtime.gte=60",
  ].join("&");

  const URL = `${endpoint}?${searchOptions}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  };

  const response = await fetch(URL, options);
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
