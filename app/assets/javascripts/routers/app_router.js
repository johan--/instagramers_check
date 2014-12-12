InstagramerApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "result": "result",
		"invalid_username": "invalidUsername",
		"access_token=:token": "index"
  },
  
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.collection = new InstagramerApp.Collections.Followers();
    this.model = new InstagramerApp.Models.Instagramer({
      collection: this.collection,
			token: this.token
    });
  },
  
  index: function (token) {
		if (token) {
			window.Token = token;
		}
		
		console.log("this is the token in the router: " + window.Token);
    var index = new InstagramerApp.Views.IndexView({
      collection: this.collection,
      model: this.model
    });
    this._swapView(index);
  },
	
	invalidUsername: function () {
		var invalidView = new InstagramerApp.Views.InvalidView();
		this._swapView(invalidView);
	},
  
  result: function() {
    var resultView = new InstagramerApp.Views.Result({
      collection: this.collection,
      model: this.model
    });
    this._swapView(resultView);
  },
  
  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    
    this.$rootEl.html(newView.render().$el);
    this.currentView = newView;
  }
})