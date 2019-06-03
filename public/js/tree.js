var maxID
$(document).ready(function(){ 
	// Config tree
	$.jstree.defaults.core.themes.variant = "large";
	$('#jstree').jstree({
		'plugins' : ['state', 'contextmenu', 'search'],
		"core": {
			"data": {
				"url": "field",
				"type": "get",
				"dataType": "json",
				'data' : (node) => {
					return { 'id' : node.id };
				},
				success: (data) => {
					maxID = data[0].id;
					for (var i = 1; i < data.length; i++)
						if (data[i].id > maxID)
							maxID = data[i].id;
				}
			},
			"check_callback" : true
		},
		"contextmenu": {
			"items": ($node) => {
				var tree = $("#jstree").jstree(true);
				return {
					"create": {
						"separator_before": false,
						"separator_after": true,
						"label": "Thêm",
						"action": () => {
							$node = tree.create_node($node);
							tree.edit($node);
						}
					},
					"rename": {
						"separator_before": false,
						"separator_after": false,
						"label": "Sửa",
						"action": () => {
							tree.edit($node);
						}
					},
					"delete": {
						"separator_before": false,
						"separator_after": false,
						"label": "Xóa",
						"action": () => {
							tree.delete_node($node);
						}
					}
				};
			}
		}
	}).on('create_node.jstree', (e, data) => {
		maxID++;
		data.instance.set_id(data.node, maxID);
		$.ajax({
			type:'POST',
			url:'researchCreate',
			dataType: 'json',
			data: {
				id: maxID,
				parent: data.node.parent,
				text: data.node.text
			}
		});
	}).on('rename_node.jstree', (e, data) => {
		$.ajax({
			type:'POST',
			url:'researchRename',
			dataType: 'json',
			data: {
				id: data.node.id,
				text: data.text
			}
		});
	}).on('delete_node.jstree', (e, data) => {
		$.ajax({
			type:'POST',
			url:'researchDelete',
			dataType: 'json',
			data: {
				id: data.node.id
			}
		});
	});

	$("#field-search").keyup(function() {
		var text = $(this).val();
		search(text);
	});

	function search(text) {
		$('#jstree').jstree(true).search(text);
	}

	$('#jstree').on("changed.jstree", function (e, data) {
		console.log(data.selected);
	});

	$('#create-root').click(function() {
		var tree = $("#jstree").jstree(true);
		maxID++;
		tree.create_node('#', {
			"id": maxID,
			"text": "New Node"
			}, "last");
		tree.edit({
			"id": maxID,
			"text": "New Node"
		});
	})
});