InstagramerApp.Views.Result = Backbone.View.extend({
  template: JST["result"],
  
  render: function () {
    var content = this.template();
    this.$el.html(content);
    
    return this;
  }
})