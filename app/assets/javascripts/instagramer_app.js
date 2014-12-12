window.InstagramerApp = {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {},
  initialize: function () {
    var $rootEl = $('#top');
    new this.Routers.AppRouter($rootEl);
    Backbone.history.start();
		InstagramerApp.Token = "";
  }
};