const apiURL = 'https://wind-bow.glitch.me/twitch-api/';
var xhr;
var userData = {};
const searchBox = document.getElementById('searchBox');
const userList = document.querySelector('.user__list');
const statusList = document.querySelectorAll('.status__item');

const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const usersNew = ["ESL_SC2"];
let setStatus = "all";

function dataRequest(user, idx) {
  xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      storeResults(response);
    }
  };

  xhr.open('GET', apiURL + 'channels/' + user, false);
  xhr.send();

  function storeResults(response) {
    userData[user].display_name = response.display_name;
    userData[user].logo = response.logo;
  };
}

function statusRequest(user, idx) {
  xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      storeResults(response);
    }
  };

  xhr.open('GET', apiURL + 'streams/' + user, false);
  xhr.send();

  function storeResults(response) {
    userData[user].stream = (response.stream) ? response.stream.game : "offline"
  };
}

function matchUsers(userToMatch, userList) {
  return userList.filter((user) => {
    const regex = new RegExp(userToMatch, 'gi');
    return user.match(regex);
  });
}

function statusUsers(userList) {
  if (setStatus === 'offline') {
    statusedUsers = userList.filter(user => {
      return userData[user].stream === 'offline'
    })
  } else if (setStatus === 'online') {
    statusedUsers = userList.filter(user => {
      return userData[user].stream !== 'offline'
    })
  } else {
    statusedUsers = userList;
  }
  return statusedUsers;
}

function displayUsers() {
  const matchedUsers = matchUsers(this.value, users);
  const statusedUsers = statusUsers(matchedUsers);
  const html = statusedUsers.map((user) => {
    return `
      <li class="user__item">
        <img src=${userData[user].logo} class="user__logo" alt="user logo" />
        <span>${userData[user].display_name}</span>
        <span>${userData[user].stream}</span>
      </li>
    `;
  }).join('');
  userList.innerHTML = html;
}

function statusActive() {
  setStatus = this.value;
  displayUsers();
}


users.forEach(user => userData[user] = {});
//console.log(userData);
users.forEach(dataRequest);
users.forEach(statusRequest);
//console.log(userData);
displayUsers();
searchBox.addEventListener('change', displayUsers);
searchBox.addEventListener('keyup', displayUsers);
statusList.forEach((status) => status.addEventListener('click', statusActive));
