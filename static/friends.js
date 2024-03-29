/*
  Main Street
  CS146 19F Final Project
  Kyla Barry, Julie (Min Jee) Cheon, Daniel Claro, Johnny Wong
*/

let username = document.getElementById("username").value;

let container = document.getElementById("friends");

let createFriend = function(username, listOfHobbies){
  let itemContainer = document.createElement("li");
  itemContainer.setAttribute("class", "cards_item");

  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let content = document.createElement("div");
  content.setAttribute("class", "card_content");

  let title = document.createElement("div");
  title.setAttribute("class", "card_title");
  title.innerText = username;

  let heading = document.createElement("h3");
  heading.innerText = "Hobbies";

  let hobbyList = document.createElement("ul");
  hobbyList.setAttribute("class", "hobbies");

  for (hobby in listOfHobbies){
    let hobbyItem = document.createElement("li");
    hobbyItem.setAttribute("class", "hobbies_item")
    hobbyItem.innerText = listOfHobbies[hobby];
    hobbyList.appendChild(hobbyItem)
  }

  let profileButton = document.createElement("button");
  profileButton.setAttribute("class", "btn btn--block");
  profileButton.innerText = "Go to Profile";
  profileButton.addEventListener("click", function(){
    window.open("/friendProfile?username=" + username, "_self");
  })


  content.appendChild(title);
  content.appendChild(heading);
  content.appendChild(hobbyList);
  content.appendChild(profileButton);

  card.appendChild(content);
  itemContainer.appendChild(card);

  container.appendChild(itemContainer);
}

let findFriends = function(){
  let xhttp = new XMLHttpRequest();
  let friends = []
  let friendHobbies = []
  xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          response = JSON.parse(this.responseText);
          console.log(response);
          console.log(Object.keys(response).length);

          for (var key in Object.keys(response)){
            let hobby = response[key];
            for (var friend in hobby){
              let currFriend = hobby[friend];
              if (!(friends.includes(currFriend[0]))){
                friends.push(currFriend[0]);
                friendHobbies.push(currFriend[1].split(","));
              }
            }
          }

          console.log(friends);
          console.log(friendHobbies);

          for (friend in friends){
            console.log(friend);
            createFriend(friends[friend], friendHobbies[friend]);
          }
        }
    };
  xhttp.open("GET", "/getFriends?username=" + username, true);
  xhttp.send();
}

findFriends();
