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
		tagsInput: '',
		categoriesInput: '',
		tagsSelected: ["Please select an item to display its tags!"],
		categoriesSelected: ["Please select an item to display its categories!"],
		selectedImages: [],
		visibleImages: []
	},

	methods: {
		getSelectedItems: function() {
			var selectedItems = [];
			for (var i = 0; i < vm.selectedImages.length; i++) {
				var found = this.images.filter(function(find) {
					return find.uid == vm.selectedImages[i];
				});
				selectedItems.push(found[0]);
			}
			return selectedItems;
		},

		addInfo: function(tar) {
			var target = event.target.id.substr(3).toLowerCase();
			var selectedItems = vm.getSelectedItems();
			for (var i = 0; i < selectedItems.length; i++) {
				selectedItems[i][target].push(tar);
			}
			var emptyThis = target + "Input";
			vm[emptyThis] = '';
		},

		displayTags: function() {
			var selectedItems = vm.getSelectedItems();
			this.tagsSelected.splice(0, this.tagsSelected.length);
			if (selectedItems.length === 1) {
				for (var i = 0; i < selectedItems.length; i++) {
					var iterateTags = selectedItems[i].tags;
					vm.tagsSelected.push(iterateTags);
				}
			} else if (selectedItems.length === 0) {
				vm.tagsSelected.push("Please select an item to display its tags!");
			} else {
				vm.tagsSelected.push("Please select only one item at a time!");
			}
		},

		displayCategories: function() {
			var selectedItems = vm.getSelectedItems();
			this.categoriesSelected.splice(0, this.categoriesSelected.length);
			if (selectedItems.length === 1) {
				for (var i = 0; i < selectedItems.length; i++) {
					var iterateCategories = selectedItems[i].categories;
					vm.categoriesSelected.push(iterateCategories);
				}
			} else if (selectedItems.length === 0) {
				vm.categoriesSelected.push("Please select an item to display its categories!");
			} else {
				vm.categoriesSelected.push("Please select only one item at a time!");
			}
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
			vm.reRenderInfo();
		},

		selectAll: function() {
			$(".img-container img").addClass("img-selected");
			this.selectedImages.splice(0, this.selectedImages.length);
			for (var image of this.visibleImages) {
				this.selectedImages.push(image);
			}
			vm.reRenderInfo();
		},

		deselectAll: function() {
			$(".img-container img").removeClass("img-selected");
			this.selectedImages.splice(0, this.selectedImages.length);
			vm.reRenderInfo();
		},

		deleteSelected: function() {
			for (var image of this.selectedImages) {
				this.images.pop(image);
			}
			this.deselectAll();
		},

		reRenderInfo: function() {
			vm.displayTags();
			vm.displayCategories();
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