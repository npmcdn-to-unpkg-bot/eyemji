var vm = new Vue({
	el: "body",

	data: {
		images: [{
			uid: '1',
			url: './img/unsplash_1.jpg',
			dateCreated: 'Aug  2 17:26',
			tags: ['rose', 'blume'],
			categories: ['natur']
		}, {
			uid: '2',
			url: './img/unsplash_2.jpg',
			dateCreated: 'Jul 30 14:09',
			tags: ['vogelperspektive', 'landschaft'],
			categories: ['natur']
		}, {
			uid: '3',
			url: './img/unsplash_3.jpg',
			dateCreated: 'Aug  4 21:38',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['natur']
		}],
		searchQuery: '',
		inputTag: '',
		inputCategorie: '',
		tagsSelected: [],
		categoriesSelected: [],
		selectedImages: [],
		visibleImages: []
	},

	methods: {
		addInfo: function(e) {
			var target = event.target.id.substr(3);
			for (var i = 0; i < vm.selectedImages.length; i++) {
				var found = this.images.filter(function(a) {
					return a.uid == vm.selectedImages[i];
				});
				found[0][target.toLowerCase()].push(e);
			}
			var emptyThis = "input" + target;
			vm[emptyThis] = '';
		},

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