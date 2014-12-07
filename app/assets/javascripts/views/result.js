InstagramerApp.Views.Result = Backbone.View.extend({
  template: JST["result"],
  subviews: [],
	className: "container",
  
  initialize: function() {
    this.listenTo(this.model, "updated", this.render);
    this.listenTo(this.collection, "add", this.addFollower);
    this.listenTo(this.collection, "change", this.finalCount);
  },
  
  addFollower: function(follower) {
    var followerView = new InstagramerApp.Views.Follower({
      model: follower
    });
    
    this.subviews.push(followerView);
    $('ul.followers').append(followerView.render().$el);
  },
  
  finalCount: function() {
    if (!this.finalCountView) {
      this.finalCountView = new InstagramerApp.Views.FinalCount({
        collection: this.collection
      });
    }
    
    $('div.final-count').html(this.finalCountView.render().$el);
  },
  
  render: function () {
    var content = this.template({
      instagramer: this.model
    });
    this.$el.html(content);

    return this;
  }
})