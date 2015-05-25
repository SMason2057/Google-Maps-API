
function initialize() 
{
    // Variables
    var mapProperties;
    var searchOptions;
    var map;
    var autocomplete;
    var infoWindow;
    var marker;
    var place; 

    // Map object whose properties contain which location the map will be focused on
    // when the page loads, the type of map to load, and which search results 
    // to restrict it to
    mapProperties =
       {
           center: new google.maps.LatLng(37.7831, -122.4039),
           zoom: 12,
           mapType: google.maps.MapTypeId.ROADMAP,
           searchType: ['address'],
       };

    // Creates a new map that gets passed to the div in the html page
    map = new google.maps.Map(document.getElementById('map-canvas'), mapProperties);

    // Attaches autocomplete service to the input element 
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('locator'), mapProperties.searchType);
    autocomplete.bindTo('bounds', map);

    // Adds an event listener to the input in the HTML file and calls the searchResults function
    google.maps.event.addListener(autocomplete, 'place_changed', searchResults);

    // Creates a new marker and window that displays information
    // about the marked location
    marker = new google.maps.Marker({ map: map });
	infoWindow = new google.maps.InfoWindow();

    // Listens for changes of query selection
    // If it returns true then this function will 
    // otherwise it will 
	 function searchResults()
	 {
	     infoWindow.close();

	     // Returns query selected by user so it can be used by the 'place_changed' event
	     place = autocomplete.getPlace();

	     if (place.geometry.viewport) 
	     {
	         map.fitBounds(place.geometry.viewport);
	     }

	     else 
	     {
	         map.setCenter(place.geometry.location);
	         map.setZoom(17);
	         google.maps.event.addListener(marker, 'click', placeMarker(event));
	     }
	 }

    // Places a marker on the map specified by the query
    // and sets the type of information to display once 
    // the marker is placed
	 function placeMarker(event) 
	 {
	     marker.setPosition(place.geometry.location);
	     infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
	     infoWindow.open(map, marker);
	 }
}

// Adds a listener event to the window object, 
// and as soon as it loads, calls the initalize function
// above
google.maps.event.addDomListener(window, 'load', initialize);