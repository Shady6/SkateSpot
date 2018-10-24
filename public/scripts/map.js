function initMap(){}

$(document).ready(function(){
	var map, service, marker;
	const fields = ['formatted_address', 'geometry'];
	var geocoder = new google.maps.Geocoder;

	// Turn on the map with center on Warsaw and zoom 10
	function initMap(){
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 52.237049, lng: 21.017532},
  			zoom: 10
		});
	}
	initMap();

	var legend = document.getElementById('legend');
       
          var name = 'Dodane spoty';
          var icon = 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png';
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
          var name = 'Twój spot';
          var icon = 'http://maps.google.com/mapfiles/ms/micons/red-dot.png';
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
        

        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);

	// Function responsible for adding marker to map and deleting previous one
	function placeMarkerAndPanTo(latLng, map){
		if(marker){
			marker.setMap(null);
		}

		marker = new google.maps.Marker({
			position: latLng,
			map: map
		});
		map.panTo(latLng);
		document.getElementById('latLng').value = latLng.toString().replace(/[() ]/igm, "");
	}

	// ascribes marker  and reverse geocoder functions to the map on a click event
	map.addListener('click', function(e){
		placeMarkerAndPanTo(e.latLng, map);
		geocodeLatLng(geocoder, e)
	});

	function geocodeLatLng(geocoder, e){
		var latLng = e.latLng;
		console.log(latLng);
		geocoder.geocode({'location': latLng}, function(results, status){
			if(status === "OK"){
				if(results[0]){
					document.getElementById('address').value = results[0].formatted_address;
					document.getElementById('dbAddress').value = results[0].formatted_address;
				}
			}
		});
	}

	// Finds all the possible addresses depending on what user wrote and then calls callback
	function findThePlaceAddress(){
		var address = document.getElementById('address').value;
		var addressesParent = document.getElementById('allAddresses');
		while(addressesParent.firstChild){
			addressesParent.removeChild(addressesParent.firstChild);
		}

		var request = {
			query: address,
			fields: fields
		}

		service = new google.maps.places.PlacesService(map);
		service.findPlaceFromQuery(request, callback);
	}

	// It is what happens after place is found by address. It shows one of possible addresses
	function callback(results, status){
		if(status == google.maps.places.PlacesServiceStatus.OK){
			console.log(results)
			if(results.length >= 2){
				for(var i = 0; i < results.length; i++){
					var path = document.createElement('div');
					path.className = 'text-center col-md btn btn-light mr-2 btn-block';
					var text = document.createTextNode(results[i].formatted_address);
					path.appendChild(text);
					path.addEventListener('click', goToThe.bind('chickenMcNugget', results,i))
					document.getElementById('allAddresses').appendChild(path);
				}
				if(window.innerWidth <= 767 && window.innerHeight <= 850){
					$('#arrow-up').css('display', 'block');
				}
			}
			else{
				goToThe(results, 0);
			}
		}
	}

	// deletes marker if there is one and then goes to the location written in the address and place marker there
	function goToThe(results, num){
		if(marker){
			marker.setMap(null);
		}
		map.setCenter({lat: results[num].geometry.location.lat(), lng: results[num].geometry.location.lng()});
		map.setZoom(12);
		marker = new google.maps.Marker({
			position: {lat: results[num].geometry.location.lat(), lng: results[num].geometry.location.lng()},
			map: map
		});
		document.getElementById('latLng').value = marker.position.toString().replace(/[() ]/igm, "");
		
		var latLng = marker.position;
		geocoder.geocode({'location': latLng}, function(results, status){
			if(status === "OK"){
				if(results[0]){
					document.getElementById('dbAddress').value = results[0].formatted_address;
				}
			}
		});
	}

	// Ascribes the function to the find button
	document.getElementById('find').addEventListener('click', findThePlaceAddress);

	document.getElementById('arrow-up').addEventListener('click', function(){
		$('#allAddresses').slideToggle();
		if(this.classList.value.indexOf('double-up') >= 0){
			this.classList.value = this.classList.value.replace('double-up', 'double-down');
		}else{
			this.classList.value = this.classList.value.replace('double-down', 'double-up');
		}
	});



	var latLngs = [];
	Array.from(document.getElementsByClassName('spotsToAdd')).forEach(function(e){
		var position = e.value;
		position = {lat: Number(position.split(",")[0]), lng: Number(position.split(",")[1]) }
		latLngs.push(position);
	});


	var markers = latLngs.map(function(location){
		return new google.maps.Marker({
			position: location,
			icon: 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png',
			map: map
		});
	});

	


});