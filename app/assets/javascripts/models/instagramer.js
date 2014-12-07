InstagramerApp.Models.Instagramer = Backbone.Model.extend({
  _token: "8413639.1fb234f.c0f10cda7f6e4234bc23be65137d5826",
  
  initialize: function(options) {
    this.collection = options.collection;
    this.lastData = false;
  },
  
  getFollowers: function() {
    var apiInstUrl = "https://api.instagram.com/v1/users/";
    apiInstUrl += this.id + "/followed-by?&access_token=" + this._token;
    this.fetchFollowers(apiInstUrl);
  },
  
  fetchFollowers: function(url) {
    var model = this;
    $.ajax({
      url: url,
      type: "GET",
      dataType: "jsonp",
      success: function (jsonResponse) {
        model.createFollowers(jsonResponse.data);
        var nextUrl = jsonResponse.pagination.next_url;
        if (nextUrl) {
          model.fetchFollowers(nextUrl);
        }
      }
    });
  },
  
  createFollowers: function (followersInfo) {
    var model = this;
    followersInfo.forEach(function (followerInfo) {
      model.collection.add(followerInfo);
    });
  },
  
  findInstagramer: function (dataArray) {
    var instagramer;
    var model = this;
    dataArray.forEach(function (user) {
      if (user.username === model.get('username')) {
        instagramer = user;
      }
    })
		if (instagramer === undefined) {
			Backbone.history.navigate("/invalid_username", { trigger : true });
		}
    this.set(instagramer)
    this.getFollowers();
  },
  
  getId: function () {
    var apiInstUrl = "https://api.instagram.com/v1/users/search?q=[";
    apiInstUrl += this.get('username') + "]&access_token=" + this._token;
    var model = this;
    $.ajax({
      url: apiInstUrl,
      type: "GET",
      dataType: "jsonp",
      success: function (jsonResponse) {
        model.findInstagramer(jsonResponse.data);
      }
    });
  },

  
})