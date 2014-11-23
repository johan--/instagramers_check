InstagramerApp.Views.Result = Backbone.View.extend({
  template: JST["result"],
  subviews: [],
  
  initialize: function() {
    this.listenTo(this.collection, "add", this.addFollower);
    this.listenTo(this.collection, "change", this.finalCount)
  },
  
  addFollower: function(follower) {
    var followerView = new InstagramerApp.Views.Follower({
      model: follower
    });
    
    this.subviews.push(followerView);
    $('ul.followers').append(followerView.render().$el);
  },
  
  finalCount: function() {
    if (this.finalCountView) {
      this.finalCountView.numFollowers = this.collection.length;
      this.finalCountView.numInvalid = this.subviews.length;
    } else {
      this.finalCountView = new InstagramerApp.Views.FinalCount({
        numFollowers: this.collection.length,
        numInvalid: this.subviews.length
      });      
    }
    
    $('div.final-count').html(this.finalCountView.render().$el);
  },
  
  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})