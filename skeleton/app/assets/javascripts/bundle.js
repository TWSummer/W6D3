/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map