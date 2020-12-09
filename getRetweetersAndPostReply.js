const Twitter = require("twitter");
const SECRETS = require("./secrets.js");

const client = new Twitter({
  consumer_key: SECRETS.secrets.API_KEY,
  consumer_secret: SECRETS.secrets.API_SECRET_KEY,
  access_token_key: SECRETS.secrets.ACCESS_TOKEN,
  access_token_secret: SECRETS.secrets.ACCESS_TOKEN_SECRET,
});

(async function () {
  const ids = await client.get("statuses/retweeters/ids", {
    id: "1336674527967727617",
    stringify_ids: true,
  });
  console.log(ids.ids);
  for (const item of ids.ids) {
    console.log(item);
    const userInfo = await client.get("users/show", { user_id: item });
    console.log(userInfo.screen_name);
    const params_tweet = {
      status: `@${userInfo.screen_name} リツイートしたアカウントにツイート`,
    };
    await client.post(
      "statuses/update",
      params_tweet,
      function (error, tweet, response) {
        if (!error) {
          console.log(tweet);
        } else {
          console.log("error");
        }
      }
    );
  }
})();
