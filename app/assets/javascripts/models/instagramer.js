InstagramerApp.Models.Instagramer = Backbone.Model.extend({
  _token: "8413639.1fb234f.c0f10cda7f6e4234bc23be65137d5826",
  
  initialize: function(options) {
    this.username = options.username;
    this.collection = new InstagramerApp.Collections.Followers();
    this.lastData = false;
    this.getId();
  },
  
  getFollowers: function() {
    var apiInstUrl = "https://api.instagram.com/v1/users/";
    apiInstUrl += this.id + "/followed-by?&access_token=" + this._token;
    var model = this;
    $.ajax({
      url: apiInstUrl,
      type: "GET",
      dataType: "jsonp",
      success: function (jsonResponse) {
        model.createFollowers(jsonResponse.data);
      }
    });
  },
  
  createFollowers: function (followersInfo) {
    var model = this;
    followersInfo.forEach(function (followerInfo) {
      model.collection.add(followerInfo);
    });
    debugger
  },
  
  findInstagramer: function (dataArray) {
    var instagramer;
    var model = this;
    dataArray.forEach(function (user) {
      if (user.username === model.username) {
        instagramer = user;
      }
    })
    this.set(instagramer)
    this.getFollowers();
  },
  
  getId: function () {
    var apiInstUrl = "https://api.instagram.com/v1/users/search?q=[";
    apiInstUrl += this.username + "]&access_token=" + this._token;
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