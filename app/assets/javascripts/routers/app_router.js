InstagramerApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "result": "result"
  },
  
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.collection = new InstagramerApp.Collections.Followers();
  },
  
  index: function () {
    var index = new InstagramerApp.Views.IndexView({
      collection: this.collection
    });
    this._swapView(index);
  },
  
  result: function() {
    var resultView = new InstagramerApp.Views.Result({
      collection: this.collection
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