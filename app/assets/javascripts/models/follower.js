InstagramerApp.Models.Follower = Backbone.Model.extend({
  _token: "8413639.1fb234f.c0f10cda7f6e4234bc23be65137d5826",
  
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
    apiInstUrl += this.id + "/?access_token=" + this._token;
    var model = this;
    $.ajax({
      url: apiInstUrl,
      type: "GET",
      dataType: "jsonp",
      success: function (jsonResponse) {
        if (jsonResponse.meta.code === 200) {
          model.parseInfo(jsonResponse.data);
        } else {
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