(function() {
	var app = angular.module('store-products', []);
	app.directive("productDescription", function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'product-description.html'
	  };
	});

	app.directive("productTabs", function() {
	 return {
		 restrict: 'E',
		 templateUrl: 'product-tabs.html',
		 controller: function() {
	 		  this.tab = 1;

		  this.isSet = function(checkTab) {
			  return this.tab === checkTab;
		  };

		  this.setTab = function(setTab) {
			  this.tab = setTab;
		  };
		 },
		controllerAs: 'tab'
	   };
	});

	app.directive("productGallery", function() {
	  return {
		  restrict: 'E',
		  templateUrl: 'product-gallery.html',
		  controller: function() {
	 		   	this.current = 0;
	 		 	this.setCurrent = function(imageNumber){
	  			this.current = imageNumber || 0;
			};
		  },
		  controllerAs: 'gallery'
	  };
	});	 

	app.directive("productSpecs", function() {
	  return {
		  restrict: "A",
		  templateUrl: "product-specs.html"
	  };
	});

	app.directive("productReviews", function() {
	  return {
		  restrict: "E",
		  templateUrl: "product-reviews.html",
		  controller: function(){
	  		this.review = {};
  		
	  		this.addReview = function(product){
	  		  product.reviews.push(this.review);
	  		  this.review = {};
	  		};
		  },
		  controllerAs: "reviewCtrl"
	  };
	});
	
})();