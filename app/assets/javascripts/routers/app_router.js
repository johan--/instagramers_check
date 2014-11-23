InstagramerApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "result": "result"
  },
  
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },
  
  index: function () {
    var index = new InstagramerApp.Views.IndexView();
    this._swapView(index);
  },
  
  result: function() {
    var resultView = new InstagramerApp.Views.ResultIndex();
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