var vm = new Vue({
	el: "body",

	data: {
		images: [{
			uid: '1',
			url: './img/unsplash_1.jpg',
			dateUploaded: Date.now(),
			tags: ['rose', 'blume'],
			categories: ['natur']
		}, {
			uid: '2',
			url: './img/unsplash_2.jpg',
			dateUploaded: '1470691849999',
			tags: ['vogelperspektive', 'outdoor'],
			categories: ['natur']
		}, {
			uid: '3',
			url: './img/unsplash_3.jpg',
			dateUploaded: '1470691813739',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['technik']
		}, {
			uid: '4',
			url: './img/unsplash_3.jpg',
			dateUploaded: '1470691813739',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['technik']
		}, {
			uid: '5',
			url: './img/unsplash_3.jpg',
			dateUploaded: '1470691813739',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['technik']
		}, {
			uid: '6',
			url: './img/unsplash_3.jpg',
			dateUploaded: '1470691813739',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['technik']
		}, {
			uid: '7',
			url: './img/unsplash_3.jpg',
			dateUploaded: '1470691813739',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['technik']
		}, {
			uid: '8',
			url: './img/unsplash_3.jpg',
			dateUploaded: '1470691813739',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['technik']
		}, {
			uid: '9',
			url: './img/unsplash_3.jpg',
			dateUploaded: '1470691813739',
			tags: ['outdoor', 'lagerfeuer'],
			categories: ['technik']
		}],
		order: -1,
		infoQuery: [],
		searchQuery: '',
		tagsInput: '',
		categoriesInput: '',
		filterTags: '',
		filterCategories: '',
		tagsVisible: [],
		categoriesVisible: [],
		tagsSelected: [],
		categoriesSelected: [],
		selectedImages: [],
		visibleImages: []
	},

	computed: {
		filteredImages: function() {
			var filteredImages = JSON.parse(JSON.stringify(this.images));
			return filteredImages;
		}
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

		addInfo: function(query) {
			var target = event.target.id.substr(3);
			var selectedItems = vm.getItems("selectedImages");
			for (var i = 0; i < selectedItems.length; i++) {
				selectedItems[i][target.toLowerCase()].push(query);
			}
			$("input#add" + target).next("button").attr("disabled", "true");
			vm[target.toLowerCase() + "Input"] = '';
			vm.reRenderList();
		},

		setVisibleImages: function() {
			var visible = document.getElementsByClassName("img-container");
			vm.visibleImages.splice(0, vm.visibleImages.length);
			Array.prototype.forEach.call(visible, function(e) {
				vm.visibleImages.push(e.id);
			});
		},

		imgSelect: function(e) {
			var selected = event.currentTarget;
			$(selected).toggleClass("img-selected");
			if ($(selected).hasClass("img-selected")) {
				if (e.shiftKey && document.getElementsByClassName("img-selected").length >= 2) {
					var prevAdd = selected;
					while (true) {
						prevAdd = $(prevAdd).prev("li");
						if ($(prevAdd).hasClass("img-selected")) {
							vm.clearSelection();
							vm.selectedImages.push(selected.id);
							break;
						} else {
							$(prevAdd).addClass("img-selected");
							vm.selectedImages.push(prevAdd[0].id);
						}
					}
					// 					var next = $(".img-container.img-selected").first();
					// 					while (true) {
					// 						next = $(next).next("li");
					// 						if ($(next).is(selected)) {
					// 							vm.selectedImages.push(selected.id);
					// 							vm.clearSelection();
					// 							break;
					// 						} else {
					// 							if (vm.selectedImages.indexOf(next[0].id) == -1) {
					// 								$(next).addClass("img-selected");
					// 								vm.selectedImages.push(next[0].id);
					// 							}
					// 						}
					// 					}
				} else {
					vm.selectedImages.push(selected.id);
				}
			} else {
				if (e.shiftKey && document.getElementsByClassName("img-selected").length >= 2) {
					var prevDel = selected;
					while (true) {
						prevDel = $(prevDel).prev("li");
						if (!$(prevDel).hasClass("img-selected")) {
							vm.clearSelection();
							vm.selectedImages.splice(vm.selectedImages.indexOf(selected.id), 1);
							break;
						} else {
							$(prevDel).removeClass("img-selected");
							vm.selectedImages.splice(vm.selectedImages.indexOf(prevDel.id), 1);
						}
					}
				} else {
					var index = vm.selectedImages.indexOf(selected.id);
					vm.selectedImages.splice(index, 1);
				}
			}
		},

		selectAll: function() {
			$(".img-container").addClass("img-selected");
			vm.selectedImages.splice(0, vm.selectedImages.length);
			for (var image of vm.visibleImages) {
				vm.selectedImages.push(image);
			}
		},

		deselectAll: function() {
			$(".img-container").removeClass("img-selected");
			vm.selectedImages.splice(0, vm.selectedImages.length);
		},

		deleteSelected: function() {
			if (confirm("Do you really want to delete the selected items?")) {
				var selectedItems = vm.getItems("selectedImages");
				for (var i = 0; i < selectedItems.length; i++) {
					var pos = vm.getData("uid", "images").indexOf(selectedItems[i].uid);
					vm.images.splice(pos, 1);
				}
			}
			vm.deselectAll();
			setTimeout(function() {
				vm.reRenderList();
			}, 1);
		},

		setVisibleInfo: function(tar) {
			var visibleImages = vm.getItems("visibleImages");
			var foundInfo = [];
			vm[tar + "Visible"].splice(0, vm[tar + "Visible"].length);
			for (var i = 0; i < visibleImages.length; i++) {
				foundInfo.push(visibleImages[i][tar]);
			}
			vm[tar + "Visible"] = vm.getInfo(foundInfo);
		},

		filterByInfo: function() {
			var target = event.target;
			var selected = target.id.substr(4).toLowerCase();
			if (target.checked) {
				vm.infoQuery.push(selected);
			} else {
				vm.infoQuery.splice(vm.infoQuery.indexOf(selected), 1);
			}
			setTimeout(function() {
				vm.reRenderList();
			}, 1);
		},

		removeInfoFilter: function() {
			var target = event.target.className.substr(7).toLowerCase();
			var amount = $(".filter-" + target);
			for (var i = 0; i < amount.length; i++) {
				$(amount[i]).prop("checked", true).click();
			}
			vm.reRenderList();
		},

		reRenderList: function() {
			vm.setVisibleImages();
			vm.setVisibleInfo("tags");
			vm.setVisibleInfo("categories");
			vm.reApplyHover();
		},

		reApplyHover: function() {
			$(".img-container").hover(function() {
				$(this).children("span").show();
			}, function() {
				$(this).children("span").hide();
			});
		},

		clearSelection: function() {
			if (document.selection) {
				document.selection.empty();
			} else if (window.getSelection) {
				window.getSelection().removeAllRanges();
			}
		},

		onVMLoad: function() {
			vm.visibleImages = vm.getData("uid", "images");
			vm.reRenderList();
		}
	}
})

vm.onVMLoad();