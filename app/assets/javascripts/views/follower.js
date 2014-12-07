InstagramerApp.Views.Follower = Backbone.View.extend({
  tagName: "li",
  template: JST["follower"],
  className: "list-group-item",
  
  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
  },
  
  render: function() {
    if (this.model.get('valid')) {
      this.remove();
    } else {
      var content = this.template({
        follower: this.model
      });
      this.$el.html(content);      
    }

    return this;
  }
})