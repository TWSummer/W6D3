const APIUtil = require("./api_util");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    if (this.followState) {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.$el.prop("disabled", true);
    console.log(APIUtil.unfollowUser);
    if (this.followState) {
      APIUtil.unfollowUser.call(this, this.userId);
    } else {
      APIUtil.followUser.call(this, this.userId);
    }
  }

  toggleFollowState() {
    this.followState = !this.followState;
    this.$el.prop("disabled", false);
    this.render();
  }
}

module.exports = FollowToggle;
