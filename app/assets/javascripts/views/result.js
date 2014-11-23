InstagramerApp.Views.Result = Backbone.View.extend({
  template: JST["result"],
  subviews: [],
  
  initialize: function() {
    this.listenTo(this.collection, "add", this.addFollower);
  },
  
  addFollower: function(follower) {
    var followerView = new InstagramerApp.Views.Follower({
      model: follower
    });
    
    this.subviews.push(followerView);
    $('ul.followers').append(followerView.render().$el);
  },
  
  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})