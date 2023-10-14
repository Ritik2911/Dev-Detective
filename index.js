const apiURL = "https://api.github.com/users/USERNAME";

const searchForm = document.querySelector("[searchForm]");
const inputField = document.querySelector(".input-field");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const mode = document.querySelector(".mode");
let curMode = 'light';
const userName = "ritik2911";
const userDetails = getUserDetails(userName);

mode.addEventListener('click',(e) =>{
    if(curMode == 'light'){
        enableDark();
        curMode = 'dark';
    }else{
        disableDark();
        curMode = 'light';
    }
});

function enableDark() {
    document.querySelector('.contact-section').classList.add('dark');
    document.querySelector('.details').classList.add('dark');
    document.querySelector('.container').classList.add('dark');
    document.querySelector('.header').classList.add('dark');
    document.querySelector('.search-form').classList.add('dark');
    document.querySelector('.wrapper').classList.add('dark');
    document.querySelector('.input-field').classList.add('dark');
    document.querySelector('.full-name').classList.add('dark');
    let temp = document.querySelectorAll('.count');
    temp.forEach((current) => {
        current.classList.add('dark');
    });

    let temp2 = Array.from(document.getElementsByTagName('a'));
    temp2.forEach((current) => {
        current.classList.add('dark');
    });

    const temp3 = document.querySelector(".mode-name");
    temp3.innerText = "Light";
    temp3.nextElementSibling.src = './Images/sun-icon.svg';
}

function disableDark() {
    document.querySelector('.contact-section').classList.remove('dark');
    document.querySelector('.details').classList.remove('dark');
    document.querySelector('.container').classList.remove('dark');
    document.querySelector('.header').classList.remove('dark');
    document.querySelector('.search-form').classList.remove('dark');
    document.querySelector('.wrapper').classList.remove('dark');
    document.querySelector('.input-field').classList.remove('dark');
    document.querySelector('.full-name').classList.remove('dark');
    let temp = document.querySelectorAll('.count');
    temp.forEach((current) => {
        current.classList.remove('dark');
    });

    let temp2 = Array.from(document.getElementsByTagName('a'));
    temp2.forEach((current) => {
        current.classList.remove('dark');
    });

    const temp3 = document.querySelector(".mode-name");
    temp3.innerText = "Dark";
    temp3.nextElementSibling.src = './Images/moon-icon.svg';

}

async function getUserDetails(userName) {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    // console.log(response);
    let data = await response.json();
    displayDetails(data);
  } catch (e) {
    console.log("Details Not found");
    const noResult = document.querySelector('[no-result]');
    noResult.classList.add('active');
  }
}

function displayDetails(userDetails) {
  const doj = document.querySelector(".doj");

  let dob = JSON.stringify(userDetails?.created_at)
    .split("T")[0]
    .substring(1)
    .split("-");
  doj.innerText = `Joined ${dob[2]} ${months[parseInt(dob[1])]} ${dob[0]}`;

  const fullName = document.querySelector(".full-name");
  fullName.innerText = userDetails?.name;

  const userName = document.querySelector(".user-name");
  userName.innerText = `@${userDetails?.login}`;

  const userImage = document.querySelector("[userImage]");
  userImage.src = userDetails?.avatar_url;

  const bio = document.querySelector(".bio");
  if(userDetails?.bio == null){
    bio.innerText = 'This profile has no bio.'
  }else{
      bio.innerText = userDetails?.bio;
  }

  const repo = document.querySelector(".repo");
  repo.innerText = userDetails?.public_repos;

  const followers = document.querySelector(".folw");
  followers.innerText = userDetails?.followers;

  const followings = document.querySelector(".foli");
  followings.innerText = userDetails?.following;

  const location = document.querySelector("[location]");
  if(userDetails?.location == null){
    location.innerText = 'Not Available';
    location.parentElement.style.opacity = '0.7';
  }else{
      location.innerText = userDetails?.location;
  }

  const twitter = document.querySelector("[twitter]");
  if(userDetails?.twitter_username == null){
    twitter.innerText = 'Not Available';
    twitter.parentElement.style.opacity = '0.7';
  }else{
      twitter.innerText = userDetails?.twitter_username;
  }

  const company = document.querySelector("[company]");
  if(userDetails?.company == null){
    company.innerText = 'Not Available';
    company.parentElement.style.opacity = '0.7';
  }else{
      company.innerText = userDetails?.company;
  }

  const website = document.querySelector("[website]");
  console.log(website);
  if(userDetails?.blog == ""){
    website.innerText = 'Not Available';
    website.parentElement.style.opacity = '0.7';
  }else{
      website.innerText = userDetails?.blog;
  }

}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputName = inputField.value;
  const noResult = document.querySelector('[no-result]');
    noResult.classList.remove('active');
  getUserDetails(inputName);
});
