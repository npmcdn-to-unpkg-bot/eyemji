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
			tags: ['vogelperspektive', 'outdoor'],
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
		tagsTest: [],
		tagsAll: [],
		categoriesAll: [],
		tagsVisible: [],
		categoriesVisible: [],
		tagsSelected: [],
		categoriesSelected: [],
		selectedImages: [],
		visibleImages: []
	},

	methods: {
		getItems: function(tar) {
			var items = [];
			for (var i = 0; i < vm[tar].length; i++) {
				var found = vm.images.filter(function(find) {
					return find.uid == vm[tar][i];
				});
				items.push(found[0]);
			}
			return items;
		},

		getInfo: function(tar) {
			function elimDup(a) {
				var temp = {};
				for (var i = 0; i < a.length; i++)
					temp[a[i]] = true;
				return Object.keys(temp);
			}

			var tempAll = tar;
			var dup = [];
			for (var i = 0; i < tempAll.length; i++) {
				for (var j = 0; j < tempAll[i].length; j++) {
					dup.push(tempAll[i][j]);
				}
			}
			var noDup = elimDup(dup);
			return noDup;
		},

		getData: function(type, loc) {
			return vm[loc].map(function(a) {
				return a[type];
			});
		},

		addInfo: function(tar) {
			var target = event.target.id.substr(3).toLowerCase();
			var selectedItems = vm.getItems("selectedImages");
			for (var i = 0; i < selectedItems.length; i++) {
				selectedItems[i][target].push(tar);
			}
			var emptyvm = target + "Input";
			vm[emptyvm] = '';
			vm[target + 'All'] = vm.getInfo(target, "images");
		},

		displayTags: function() {
			var selectedItems = vm.getItems("selectedImages");
			vm.tagsSelected.splice(0, vm.tagsSelected.length);
			if (selectedItems.length === 1) {
				for (var i = 0; i < selectedItems.length; i++) {
					var iterateTags = selectedItems[i].tags;
					vm.tagsSelected.push(iterateTags);
				}
			} else if (selectedItems.length === 0) {
				vm.tagsSelected.push("");
			} else {
				vm.tagsSelected.push("Please select only one item at a time!");
			}
		},

		displayCategories: function() {
			var selectedItems = vm.getItems("selectedImages");
			vm.categoriesSelected.splice(0, vm.categoriesSelected.length);
			if (selectedItems.length === 1) {
				for (var i = 0; i < selectedItems.length; i++) {
					var iterateCategories = selectedItems[i].categories;
					vm.categoriesSelected.push(iterateCategories);
				}
			} else if (selectedItems.length === 0) {
				vm.categoriesSelected.push("");
			} else {
				vm.categoriesSelected.push("Please select only one item at a time!");
			}
		},

		setVisibleImages: function() {
			var visible = document.getElementsByClassName("img-container");
			vm.visibleImages.splice(0, vm.visibleImages.length);
			Array.prototype.forEach.call(visible, function(e) {
				vm.visibleImages.push(e.id);
			});
		},

		imgSelect: function() {
			var selected = event.currentTarget;
			$(selected.firstElementChild).toggleClass("img-selected");
			if ($(selected.firstElementChild).hasClass("img-selected")) {
				vm.selectedImages.push(selected.id);
			} else {
				var index = vm.selectedImages.indexOf(selected.id);
				vm.selectedImages.splice(index, 1);
			}
			vm.reRenderInfo();
		},

		selectAll: function() {
			$(".img-container img").addClass("img-selected");
			vm.selectedImages.splice(0, vm.selectedImages.length);
			for (var image of vm.visibleImages) {
				vm.selectedImages.push(image);
			}
			vm.reRenderInfo();
		},

		deselectAll: function() {
			$(".img-container img").removeClass("img-selected");
			vm.selectedImages.splice(0, vm.selectedImages.length);
			vm.reRenderInfo();
		},

		deleteSelected: function() {
			for (var image of vm.selectedImages) {
				vm.images.pop(image);
			}
			vm.deselectAll();
		},

		setVisibleInfo: function(tar) {
			var visibleImages = vm.getItems("visibleImages");
			var foundInfo = [];
			vm[tar + "Visible"].splice(0, vm[tar + "Visible"].length);
			for (var i = 0; i < visibleImages.length; i++) {
				var iterateInfo = visibleImages[i][tar];
				foundInfo.push(iterateInfo);
			}
			vm[tar + "Visible"] = vm.getInfo(foundInfo);
		},

		filterByInfo: function() {
			var selected = event.currentTarget.id.substr(4).toLowerCase();
		},

		reRenderInfo: function() {
			vm.displayTags();
			vm.displayCategories();
		},

		reRenderList: function() {
			vm.deselectAll();
			vm.setVisibleInfo("tags");
			vm.setVisibleInfo("categories");
			vm.setVisibleImages();
		},

		onVMLoad: function() {
			vm.visibleImages = vm.getData("uid", "images");

			// 			vm.tagsAll = vm.getInfo("tags", "images");
			// 			vm.categoriesAll = vm.getInfo("categories", "images");
		}
	}
})

// Vue.filter('currentInfo', function (value) {
//   return value.reverse();
// })

vm.onVMLoad();