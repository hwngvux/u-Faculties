var maxID
$(document).ready(function(){ 
	// Config tree
	$.jstree.defaults.core.themes.variant = "large";
	$('#jstree').jstree({
		'plugins' : ['state', 'search'],
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
    })
    
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

});