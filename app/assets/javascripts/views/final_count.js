InstagramerApp.Views.FinalCount = Backbone.View.extend({
  template: JST["final_count"],
  
	numFollowers: function() {
		return this.collection.length;
	},
	
	numInvalid: function() {
		var invalids = 0;
		this.collection.each( function(follower) {
			if (!follower.get('valid')) {
				invalids++;
			}
		});
		
		return invalids;
	},
	
  render: function() {
    var content = this.template({
      numFollowers: this.numFollowers(),
      numInvalid: this.numInvalid()
    });
    this.$el.html(content);
    
    return this;
  }
})