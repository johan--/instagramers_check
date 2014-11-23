InstagramerApp.Views.FinalCount = Backbone.View.extend({
  template: JST["final_count"],
  
  initialize: function(options) {
    this.numFollowers = options.numFollowers;
    this.numInvalid = options.numInvalid;
  },
  
  render: function() {
    var content = this.template({
      numFollowers: this.numFollowers,
      numInvalid: this.numInvalid
    });
    this.$el.html(content);
    
    return this;
  }
})