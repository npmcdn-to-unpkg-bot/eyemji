var vm = new Vue({
	el: "body",

	data: {
		images: [{
			id: '1',
			url: './img/unsplash_1.jpg',
			tags: ['rose','blume']
		}, {
			id: '2',
			url: './img/unsplash_2.jpg',
			tags: ['vogelperspektive','landschaft']
		}, {
			id: '3',
			url: './img/unsplash_3.jpg',
			tags: ['outdoor','lagerfeuer']
		}],
		searchQuery: '',
		visibleImages: [],
		selectedImages: []
	},

	methods: {
		onLoadVisibleImages: function() {
			this.visibleImages = this.images.slice();
			console.log(this.visibleImages);
		},
		
		imgSelect: function(t) {
			var cb = t.target;
			$(cb).toggleClass("img-selected");
			if ($(cb).hasClass("img-selected")) {
				this.selectedImages.push(cb);
			} else {
				this.selectedImages.pop(cb);
			}
		},

		selectAll: function() {
			$(".img-container img").addClass("img-selected");
			this.selectedImages.splice(0, this.selectedImages.length);
			for (var image of this.visibleImages) {
				this.selectedImages.push(image);
			}
		},

		deselectAll: function() {
			$(".img-container img").removeClass("img-selected");
			this.selectedImages.splice(0, this.selectedImages.length);
		},

		deleteSelected: function() {
			for (var image of this.selectedImages) {
				this.images.pop(image);
			}
		}
	}
})

vm.onLoadVisibleImages();

Vue.transition('bounce', {
	enterClass: 'bounceInLeft',
	leaveClass: 'bounceOutRight'
})