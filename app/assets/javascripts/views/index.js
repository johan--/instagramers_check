InstagramerApp.Views.IndexView = Backbone.View.extend({
  template: JST['index'],
  className: "text-vertical-center",
  
  events: {
    "submit form": "checkFollowers"
  },
  
  checkFollowers: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var username = $form.serializeJSON().instagramer.username;
    this.model.set({
      username: username
    });
    this.model.getId();
    Backbone.history.navigate("/result", { trigger: true });
  },
  
  render: function() {
    var content = this.template();
    this.$el.html(content);
    
    return this;
  }
})