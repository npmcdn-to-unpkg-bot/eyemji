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
		searchQuery: '',
		tagsInput: '',
		categoriesInput: '',
		filterTags: '',
		filterCategories: '',
		tagsQuery: [],
		categoriesQuery: [],
		tagsVisible: [],
		categoriesVisible: [],
		tagsSelected: [],
		categoriesSelected: [],
		selectedImages: []
	},

	computed: {
		/*
			Generates the collection of items based on tags, categories and search query.
			It iterates over all the items and changes their "visible" boolean based on the selected values.
			If all values are empty it will just clone the items data and display that.
			At the end, all the items that have the "visible" boolean turned to 'true' are being added to and array to output it.
		*/
		filteredImages: function() {
			var filteredImages = [];
			for (var i = 0; i < this.images.length; i++) {
				if (this.searchQuery.length === 0 && this.tagsQuery.length === 0 && this.categoriesQuery.length === 0) {
					this.images[i].visible = true;
				} else {
					for (var tQ = 0; tQ < this.tagsQuery.length; tQ++) {
						if (this.images[i].tags.indexOf(this.tagsQuery[tQ]) == -1) {
							this.images[i].filterHit = false;
						}
					}
					for (var cQ = 0; cQ < this.categoriesQuery.length; cQ++) {
						if (this.images[i].categories.indexOf(this.categoriesQuery[cQ]) == -1) {
							this.images[i].filterHit = false;
						}
					}
					if (this.searchQuery.length >= 1) {
						for (var tL = 0; tL < this.images[i].tags.length; tL++) {
							if (this.images[i].tags[tL].indexOf(this.searchQuery) != -1) {
								this.images[i].searchHit = true;
							}
						}
						for (var cL = 0; cL < this.images[i].categories.length; cL++) {
							if (this.images[i].categories[cL].indexOf(this.searchQuery) != -1) {
								this.images[i].searchHit = true;
							}
						}
					} else {
						this.images[i].searchHit = true;
					}
					if (this.images[i].filterHit !== false && this.images[i].searchHit === true) {
						this.images[i].visible = true;
					}
				}
			}
			filteredImages = _.filter(this.images, ['visible', true]);
			return filteredImages;
		}
	},

	methods: {
		/*
			Used to get the objects via the "uid" of the items given to the method.
		*/
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

		/*
			Searches through a given array after a certain key;
			it then returns all the found values for that key.
		*/
		getData: function(type, loc) {
			return vm[loc].map(function(a) {
				return a[type];
			});
		},

		/*
			Flattens a nested array of values.
		*/
		getInfo: function(tar) {
			var tempAll = tar;
			var dup = [];
			for (var i = 0; i < tempAll.length; i++) {
				for (var j = 0; j < tempAll[i].length; j++) {
					dup.push(tempAll[i][j]);
				}
			}
			var noDup = vm.elimDup(dup);
			return noDup;
		},

		/*
			Eliminates duplicates from an array.
		*/
		elimDup: function(a) {
			var temp = {};
			for (var i = 0; i < a.length; i++)
				temp[a[i]] = true;
			return Object.keys(temp);
		},

		/*
			Fires when adding a new tag/category to a selection of items.
		*/
		addInfo: function(event, query) {
			var target = event.target.id.substr(3);
			var selectedItems = vm.getItems("selectedImages");
			for (var i = 0; i < selectedItems.length; i++) {
				selectedItems[i][target.toLowerCase()].push(query);
			}
			$("input#add" + target).next("button").attr("disabled", "true");
			vm[target.toLowerCase() + "Input"] = '';
			vm.reRenderList();
		},

		/*
			Gives the clicked items a visual selection box as well as adding them to an array of selected items.
			It also checks if the shift-key was pressed while selecting, if that evalutes to true it iterates over the items backwards to the last item that's already selected;
			it then selects everything in between.
			Left an alternative way of selection commented out for future use.
		*/
		imgSelect: function(event) {
			var selected = event.currentTarget;
			$(selected).toggleClass("img-selected");
			if ($(selected).hasClass("img-selected")) {
				if (event.shiftKey && document.getElementsByClassName("img-selected").length >= 2) {
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
				if (event.shiftKey && document.getElementsByClassName("img-selected").length >= 2) {
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
					vm.selectedImages.splice(vm.selectedImages.indexOf(selected.id), 1);
				}
			}
		},

		/*
			Adds all the currently displayed items to the array of selected ones after deselecting all.
		*/
		selectAll: function() {
			$(".img-container").addClass("img-selected");
			vm.selectedImages.splice(0, vm.selectedImages.length);
			for (var item of vm.filteredImages) {
				vm.selectedImages.push(item.uid);
			}
		},

		/*
			Deletes the whole array with selected items.
		*/
		deselectAll: function() {
			$(".img-container").removeClass("img-selected");
			vm.selectedImages.splice(0, vm.selectedImages.length);
		},

		/*
			Iterates over the selected items if the 'delete'-button gets pressed and removes them entirely from the data after a confirmation prompt.
		*/
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
			}, 21);
		},

		/*
			Mainly used in the 'reRenderList'-method to determine which tags/categories should be displayed in the sidebar based on the currently displayed items.
		*/
		setVisibleInfo: function(tar) {
			var foundInfo = [];
			vm[tar + "Visible"].splice(0, vm[tar + "Visible"].length);
			for (var i = 0; i < vm.filteredImages.length; i++) {
				foundInfo.push(vm.filteredImages[i][tar]);
			}
			vm[tar + "Visible"] = vm.getInfo(foundInfo);
		},

		/*
			Adds tag/category to the array of selected ones after clicking on one in the sidebar.
			The array is then used to compute the 'filteredImages'-property.
		*/
		filterByInfo: function(event, tar) {
			vm.reRenderList();
			var target = event.target;
			var selected = target.id.substr(4).toLowerCase();
			if (target.checked) {
				vm[tar + "Query"].push(selected);
			} else {
				vm[tar + "Query"].splice(vm[tar + "Query"].indexOf(selected), 1);
			}
			setTimeout(function() {
				vm.reRenderList();
			}, 21);
			vm.deselectAll();
		},

		/*
			Upon clicking onto the 'Remove Filters'-button this method removes either all tags or categories from the currently selected ones.
		*/
		removeInfoFilter: function(event) {
			var target = event.target.className.substr(7).toLowerCase();
			var amount = $(".filter-" + target);
			for (var i = 0; i < amount.length; i++) {
				$(amount[i]).prop("checked", true).click();
			}
			vm[target + "Query"].splice(0, vm[target + "Query"].length);
			setTimeout(function() {
				vm.reRenderList();
			}, 21);
		},

		/*
			This method is used to re-render the sidebar. It finds out which tags/categories are currently still possible to select based on the currently displayed items.
			It also reapplies the hover method and resets the 'visible' boolean of all the items.
		*/
		reRenderList: function() {
			vm.setVisibleInfo("tags");
			vm.setVisibleInfo("categories");
			vm.resetVisible();
			vm.reApplyHover();
		},

		/*
			This resets all the items to be currently 'visible'.
			This is just used for the computed property to re-compute everything properly on every data change.
		*/
		resetVisible: function() {
			$.each(vm.images, function() {
				this.visible = false;
				this.filterHit = true;
				this.searchHit = false;
			});
		},

		/*
			Formerly on every change of the DOM, the changed items lost their JQuery event to display an info box on hover.
			This re-applies this JQuery event on every re-rendering of the DOM to counter this behavior.
		*/
		reApplyHover: function() {
			$(".img-container").hover(function() {
				$(this).children("span").show();
			}, function() {
				$(this).children("span").hide();
			});
		},

		/*
			This is so far just used for the shift-key bulk selection.
			It prevents the normal behavior of the browser to highlight all the text in blue, which looked very odd.
		*/
		clearSelection: function() {
			if (document.selection) {
				document.selection.empty();
			} else if (window.getSelection) {
				window.getSelection().removeAllRanges();
			}
		},

		/*
			This is just used to fire certain methods right upon loading this JS-file.
		*/
		onVMLoad: function() {
			vm.reRenderList();
		}
	}
})

vm.onVMLoad();

window.setInterval(function() {
	vm.reRenderList();
}, 123);