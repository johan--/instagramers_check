InstagramerApp.Models.Follower = Backbone.Model.extend({
  // _token: "8413639.1fb234f.7e1a75214c424cf7a4b91f4d5522068d",
  // "8413639.1fb234f.c0f10cda7f6e4234bc23be65137d5826"
  
  initialize: function(options) {
    this.fetchApi();
  },
  
  isValid: function() {
    // return this.get("followed_by") > 50;
    return !(this.get("media") < 6 &&
              this.get("follows") > 3000 &&
              this.get("followed_by") > 400);
  },
  
  fetchApi: function() {
    var apiInstUrl = "https://api.instagram.com/v1/users/";
    apiInstUrl += this.id + "/?access_token=" + InstagramerApp.Token;
    var model = this;
    $.ajax({
      url: apiInstUrl,
      type: "GET",
      dataType: "jsonp",
      success: function (jsonResponse) {
        if (jsonResponse.meta.code === 200) {
          model.parseInfo(jsonResponse.data);
        } else {
          console.log('no access to the instagramer');
          model.set("valid", true);
        }
      }
    });
  },
  
  parseInfo: function(followerInfo) {
    this.set(followerInfo.counts);
    this.set('valid', this.isValid());
  },
});