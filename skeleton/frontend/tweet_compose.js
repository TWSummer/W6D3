const APIUtil = require("./api_util");

class TweetCompose {
  constructor() {
    this.$form = $('.tweet-compose').eq(0);
    this.$form.on("submit", this.makeTweet.bind(this));
  }

  makeTweet(e) {
    e.preventDefault();
    const data = this.$form.serializeJSON();
    APIUtil.createTweet(data, this.addTweet.bind(this));
  }

  addTweet(response) {
    const $ul = $('#feed');
    console.log(response);
    const $li = $(`<li>${response.content}</li>`);
    $ul.append($li);
  }

  test(response) {
    console.log(response);
  }
}

module.exports = TweetCompose;
