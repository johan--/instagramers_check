InstagramerApp.Views.InvalidView = Backbone.View.extend({
	template: JST["invalid"],
	className: "text-vertical-center",
	
	render: function () {
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
})