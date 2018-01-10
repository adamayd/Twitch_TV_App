const apiURL = 'https://wind-bow.glitch.me/twitch-api/';
var xhr;
const searchBox = document.getElementById('searchBox');
const userList = document.querySelector('.user__list');
const statusList = document.querySelectorAll('.status__item');

const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let setStatus = "all";

function makeRequest() {
  console.log('making request');
  xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      showResults(response);
    }
  };

  xhr.open('GET', apiURL + 'channels/freecodecamp', true);
  xhr.send();

  showResults = (response) => {
    console.log(response._id);
    const userItem = document.querySelector('.user__item:nth-of-type(4)');
    const html = `<img src=${response.logo} class="user__logo" alt="user logo" /><span>${response.display_name}</span>`;
    userItem.innerHTML = html;
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
}

function statusActive() {
  setStatus = this.value;
}


displayUsers();
makeRequest();
searchBox.addEventListener('change', displayUsers);
searchBox.addEventListener('keyup', displayUsers);
statusList.forEach((status) => status.addEventListener('click', statusActive));
