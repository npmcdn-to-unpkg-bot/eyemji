var vm = new Vue({
	el: "body",

	data: {
		images: [{
			uid: '1',
			url: './img/unsplash_1.jpg',
			tags: ['rose', 'blume']
		}, {
			uid: '2',
			url: './img/unsplash_2.jpg',
			tags: ['vogelperspektive', 'landschaft']
		}, {
			uid: '3',
			url: './img/unsplash_3.jpg',
			tags: ['outdoor', 'lagerfeuer']
		}],
		searchQuery: '',
		selectedImages: [],
		visibleImages: []
	},

	methods: {
		setVisibleImages: function() {
			var visible = document.getElementsByClassName("img-container");
			this.visibleImages.splice(0, this.visibleImages.length);
			Array.prototype.forEach.call(visible, function(e) {
				vm.visibleImages.push(e.id);
			});
		},

		imgSelect: function() {
			var selected = event.currentTarget;
			$(selected.firstElementChild).toggleClass("img-selected");
			if ($(selected.firstElementChild).hasClass("img-selected")) {
				this.selectedImages.push(selected.id);
			} else {
				var index = this.selectedImages.indexOf(selected.id);
				this.selectedImages.splice(index, 1);
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

		reRenderList: function() {
			this.deselectAll();
			this.setVisibleImages();
		},

		onVMLoad: function() {
			this.visibleImages = this.images.map(function(a) {
				return a.uid;
			});
		}
	}
})

vm.onVMLoad();