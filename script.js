const searchBox = document.getElementById('searchBox');
const userList = document.querySelector('.user__list');
const statusList = document.querySelectorAll('.status__item');

const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let setStatus = "all";

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
searchBox.addEventListener('change', displayUsers);
searchBox.addEventListener('keyup', displayUsers);
statusList.forEach((status) => status.addEventListener('click', statusActive));