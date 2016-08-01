function queryListener() {
  $("#query-form").submit(() => {
    event.preventDefault()
    createDestinations()
  })
}

function getPlaces() {
  $.ajax({
    method: 'get',
    url: "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+New+York&key=AIzaSyCfIm9SvYS95hI47ulG5GEMmWKtl9JenlE"
  }).done(function(response) {
    debugger
  })
}

function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};


$(document).ready(() => {
  queryListener()
})
