const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor(nav) {
    this.$nav = $(nav);
    this.$ul = this.$nav.find("ul");
    this.$input = this.$nav.find("input");
    this.$input.on("input", this.handleInput.bind(this));
  }

  handleInput() {
    const queryVal = this.$input.val();
    APIUtil.searchUsers(queryVal, this.renderResults.bind(this));
  }

  renderResults(response) {
    console.log(response);
    this.$ul.empty();
    for (let i = 0; i < response.length; i++) {
      const $a = (`<a href="/users/${response[i].id}">${response[i].username}</a>`);
      const $li = $("<li>");
      $li.append($a);
      const $button = $(`<button type="button"
                                  name="button"
                                  class="follow-toggle"
                                  data-user-id="${response[i].id}"
                                  data-initial-follow-state="${response[i].followed}">
                                  </button>`);
      const follow_toggle = new FollowToggle($button[0]);
      $li.append($button);
      this.$ul.append($li);
    }

  }
}


module.exports = UsersSearch;
