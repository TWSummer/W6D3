const APIUtil = {
  followUser: function(id) {
    $.ajax({
      type: "POST",
      url: `/users/${id}/follow`,
      dataType: "json",
      success: this.toggleFollowState.bind(this),
    });
  },

  unfollowUser: function(id) {
    $.ajax({
      type: "DELETE",
      url: `/users/${id}/follow`,
      dataType: "json",
      success: this.toggleFollowState.bind(this),
    });
  },

  searchUsers(queryVal, success) {
    $.ajax({
        type: "GET",
        url: "/users/search",
        dataType: "json",
        success: success,
        data: {
          query: queryVal
        },
    });
  },

  createTweet(data, success) {
    $.ajax({
      type: "POST",
      url: "/tweets",
      dataType: "json",
      success: success,
      data: data,
    });
  },
};

module.exports = APIUtil;
