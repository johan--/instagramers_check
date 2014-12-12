InstagramerApp.Models.Instagramer = Backbone.Model.extend({
  // _token: "8413639.1fb234f.7e1a75214c424cf7a4b91f4d5522068d",
    
  initialize: function(options) {
    this.collection = options.collection;
    this.lastData = false;
  },
  
  getFollowers: function() {
    var apiInstUrl = "https://api.instagram.com/v1/users/";
    apiInstUrl += this.id + "/followed-by?&access_token=" + InstagramerApp.Token;
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
		followersInfo.token = InstagramerApp.Token;
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
    this.trigger('updated');
    this.getFollowers();
  },
  
  getId: function () {
		debugger;
    var apiInstUrl = "https://api.instagram.com/v1/users/search?q=";
    apiInstUrl += this.get('username') + "&access_token=" + InstagramerApp.Token;
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