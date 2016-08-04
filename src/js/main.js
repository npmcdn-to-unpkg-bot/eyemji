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
		setVisibleImages: function() {
			this.visibleImages = this.images.slice();
		},
		
		imgSelect: function(sel) {
			var cb = event.currentTarget.firstElementChild;
			$(cb).toggleClass("img-selected");
			console.log(sel);
			var slctd = event.target;
			if ($(cb).hasClass("img-selected")) {
				this.selectedImages.push(slctd);
			} else {
				this.selectedImages.pop(slctd);
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
			this.deselectAll();
		},
		
		onVMLoad: function() {
			this.setVisibleImages();
		}
	}
})

vm.onVMLoad();

Vue.transition('fade', {
	enterClass: 'fadeInUp',
	leaveClass: 'fadeOutDown'
})