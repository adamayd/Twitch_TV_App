const apiURL = 'https://wind-bow.glitch.me/twitch-api/';
var xhr;
var userData = {};
const searchBox = document.getElementById('searchBox');
const userList = document.querySelector('.user__list');
const statusList = document.querySelectorAll('.status__item');

const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const usersNew = ["ESL_SC2"];
let setStatus = "all";

function makeRequest(user, idx) {
  console.log('making request for ' + user);
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

function matchUsers(userToMatch, userList) {
  return userList.filter((user) => {
    const regex = new RegExp(userToMatch, 'gi');
    return user.match(regex);
  });
}

function displayUsers() {
  const matchedUsers = matchUsers(this.value, users);
  const html = matchedUsers.map((user) => {
    return `
      <li class="user__item">
        <span>${user}</span>
      </li>
    `;
  }).join('');
  userList.innerHTML = html;

  
//    console.log(response._id);
//    const userItem = document.querySelector('.user__item:nth-of-type(' + (idx + 1) + ')');
//    const html = `<img src=${response.logo} class="user__logo" alt="user logo" /><span>${response.display_name}</span>`;
//    userItem.innerHTML = html;
}

function statusActive() {
  setStatus = this.value;
}


displayUsers();
users.forEach(user => userData[user] = {});
console.log(userData);
users.forEach(makeRequest);
console.log(userData);
searchBox.addEventListener('change', displayUsers);
searchBox.addEventListener('keyup', displayUsers);
statusList.forEach((status) => status.addEventListener('click', statusActive));
