InstagramerApp.Views.IndexView = Backbone.View.extend({
  template: JST['index'],
  className: "text-vertical-center",
  
  events: {
    "submit form": "checkFollowers"
  },
	
	initialize: function (options) {
		this.href = "https://instagram.com/oauth/authorize/?client_id=3a1550c52a0645bdb3ab2b23cac5f71f&redirect_uri=http://instagramer-check.herokuapp.com/&response_type=token";
		this.token = window.Token;
	},
  
  checkFollowers: function (event) {
    event.preventDefault();
		if (this.Token === "") {
			window.open(this.href, '_self'); // "width=400, height=230, left=300, top=300");
		} else {
	    var $form = $(event.currentTarget);
	    var username = $form.serializeJSON().instagramer.username;
	    this.model.set({
	      username: username
	    });
	    this.model.getId();
	    Backbone.history.navigate("/result", { trigger: true });			
		}
  },
  
  render: function() {
    var content = this.template();
    this.$el.html(content);
    
    return this;
  }
})