const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");

$( () => {
  const $followButtons = $('button.follow-toggle');
  const followToggleObjects = [];
  $followButtons.each((idx, el) => {
    followToggleObjects.push(new FollowToggle(el));
  });

  const searchNav = $('nav.users-search')[0];
  const searchObject = new UsersSearch(searchNav);

  const tweetCompose = new TweetCompose();
});
