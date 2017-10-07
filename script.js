// on document load make api call

// fun fun

// twitch api call

// more api fun

// all users button event listener
document.getElementById('statusAll').addEventListener('click', function() {
  document.getElementById('statusAll').style.backgroundColor = 'yellow';
  document.getElementById('statusAll').style.color = '#000';
  document.getElementById('statusOnline').style.background = '#555';
  document.getElementById('statusOnline').style.color = '#fff';
  document.getElementById('statusOffline').style.background = '#555';
  document.getElementById('statusOffline').style.color = '#fff';
});

// online users button event listener
document.getElementById('statusOnline').addEventListener('click', function() {
  document.getElementById('statusAll').style.backgroundColor = '#555';
  document.getElementById('statusAll').style.color = '#fff';
  document.getElementById('statusOnline').style.background = 'green';
  document.getElementById('statusOnline').style.color = '#000';
  document.getElementById('statusOffline').style.background = '#555';
  document.getElementById('statusOffline').style.color = '#fff';
});

// offline users button event listener
document.getElementById('statusOffline').addEventListener('click', function() {
  document.getElementById('statusAll').style.backgroundColor = '#555';
  document.getElementById('statusAll').style.color = '#fff';
  document.getElementById('statusOnline').style.background = '#555';
  document.getElementById('statusOnline').style.color = '#fff';
  document.getElementById('statusOffline').style.background = 'red';
  document.getElementById('statusOffline').style.color = '#000';
});

// search the current users listed
document.getElementById('searchBox').addEventListener('keyup', function () {
  var searchField = document.getElementById('searchBox').value;
  var searchExp = new RegExp(searchField, "i"); // allow for any case search
  // console.log(searchExp);
  var nameValue = 'User 5';
  // get the JSON object from API
  var output = '<ul class="searchResults">';
  //for each value in JSON
  console.log(nameValue.search(searchExp));
  if (nameValue.search(searchExp) != -1) {
    output += '<li><h2>';
    output += nameValue;
    output += '</h4></li>';  
  }
  output += '</ul>';
  document.getElementById('usersJS').innerHTML = output;
});