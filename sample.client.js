	var username = "admin";
	var password = "passw";
	
	console.log("authentication...")
	$.ajax({
			url:"http://my.host/restws/session/token-cors",
			beforeSend: function(xhr) { 
				xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
			},
			xhrFields: {
				withCredentials: true
			}
		})
	  .done(function(token, textStatus, jqXHR) {
		//jquery has set the auth cookie now
		console.log("read token:", token);
	
		console.log("inserting node...");
		$.ajax({
			type:"POST",
			url:"http://my.hostnode/",
			data: '{"type":"my_content_type","title":"TEST ajax","field_description":"some content of the description field"}',
			contentType: "application/json",
			beforeSend: function(xhr) { 
				xhr.setRequestHeader("X-CSRF-Token", token);
			},
			xhrFields: {
				withCredentials: true
			}
		}).done(function(response, textStatus, jqXHR) {
			console.log("response:",response);
			console.log("textStatus:",textStatus);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("AJAX error inserting node: " + textStatus + ' : ' + errorThrown);
		});
		
	  })
	  .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("AJAX error during authentication: " + textStatus + ' : ' + errorThrown);
	  });
	
