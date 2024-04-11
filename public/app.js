function configure_message_bar(message) {
  r_e("message_bar").classList.remove("is-hidden");
  r_e("message_bar").innerHTML = message;
  setTimeout(() => {
    r_e("message_bar").classList.add("is-hidden");
    r_e("message_bar").innerHTML = "";
  }, 3000);
}

r_e("sign_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let email_val = r_e("email_").value;
  let password_val = r_e("password_").value;
  let full_name_val = r_e("signup_name").value;
  auth
    .createUserWithEmailAndPassword(email_val, password_val)
    .then(() => {
      let dbuser = { email: email_val, full_name: full_name_val };
      db.collection("ama_users").add(dbuser);
      r_e("sign_form").reset();
      r_e("signmodal").classList.remove("is-active");
      configure_message_bar(
        `Signed Up Successfully - Welcome ${full_name_val}!`
      );
      r_e("signup_error").innerHTML = "";
    })
    .catch((err) => {
      r_e("signup_error").innerHTML = err.message;
    });
});

r_e("log_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let email_val = r_e("email").value;
  let password_val = r_e("password").value;
  auth
    .signInWithEmailAndPassword(email_val, password_val)
    .then(() => {
      r_e("log_form").reset();
      r_e("logmodal").classList.remove("is-active");
      db.collection("ama_users")
        .where(`email`, `==`, `${email_val}`)
        .get()
        .then((user) => {
          configure_message_bar(
            `Signed In Successfully - Welcome Back ${
              user.docs[0].data().full_name
            }!`
          );
        });
      r_e("log_error").innerHTML = "";
    })
    .catch((err) => {
      r_e("log_error").innerHTML = err.message;
    });
});

r_e("signout_button").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      configure_message_bar("Signed Out Successfully!");
      if (r_e("cal_page") != null) {
        loadHomePage;
        r_e("joinbuttonhome").addEventListener("click", openSignupModal);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// check user
auth.onAuthStateChanged((user) => {
  if (user) {
    r_e("indicator").innerHTML = `Signed In As ${user.email}`;
    r_e("signout_button").classList.remove("is-hidden");
    r_e("indicator").classList.remove("is-hidden");
    r_e("signupbtn").classList.add("is-hidden");
    r_e("loginbtn").classList.add("is-hidden");
    if (r_e("joinbuttonhome") != null) {
      r_e("joinbuttonhome").classList.add("is-hidden");
    }
  } else {
    r_e("indicator").innerHTML = "";
    r_e("signout_button").classList.add("is-hidden");
    r_e("indicator").classList.add("is-hidden");
    r_e("signupbtn").classList.remove("is-hidden");
    r_e("loginbtn").classList.remove("is-hidden");
    if (r_e("joinbuttonhome") != null) {
      r_e("joinbuttonhome").classList.remove("is-hidden");
    }
  }
});

// Grab the elements for login and signup buttons and modals
var loginButton = document.getElementById("loginbtn");
var signupButton = document.getElementById("signupbtn");
var loginModal = document.getElementById("logmodal");
var signupModal = document.getElementById("signmodal");

// Function to open login modal
function openLoginModal() {
  loginModal.classList.add("is-active");
}

// Function to open signup modal
function openSignupModal() {
  signupModal.classList.add("is-active");
}

// Event listeners for login and signup buttons
loginButton.addEventListener("click", openLoginModal);
signupButton.addEventListener("click", openSignupModal);

// Close modals when clicking on the background or "X" button
document
  .querySelectorAll(".modal-background, .modal-close")
  .forEach(function (el) {
    el.addEventListener("click", function () {
      loginModal.classList.remove("is-active");
      signupModal.classList.remove("is-active");
    });
  });

let signup_cancel = document.querySelector("#signup_cancel");
signup_cancel.addEventListener("click", () => {
  r_e("signmodal").classList.remove("is-active");
});
let log_cancel = document.querySelector("#log_cancel");
log_cancel.addEventListener("click", () => {
  loginModal.classList.remove("is-active");
});

r_e("user_found").addEventListener("click", () => {
  if (signupModal.classList.contains("is-active")) {
    signupModal.classList.remove("is-active");
    loginModal.classList.add("is-active");
  }
});

let home_page_content = `<div class="titleContainers">
<div class="column column1">
    <h1 class="title has-text-light">Welcome to <br />AMA UW-Madison</h1>
</div>
<div class="column column2">
    <img src="images/capitalPlaceholder.png" alt="MadisonCapital" width="100%" height="100%" />
</div>
</div>
<div id="aboutSection" class="aboutSection-box">
<h2 class="primaryheader">About us</h2>
<p class="primaryBody">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at magni
    porro voluptatibus, quasi doloribus provident officiis, illo hic laborum
    distinctio mollitia quis minima ducimus.
</p>
</div>
<div id="involvementSection" class="involvementSection">
<div class="involvementText">
    <h3 class="secondaryheader">Get involved</h3>
    <h4 class="tertiaryHeader">Our primary events include:</h4>
    <ul class="primaryBody">
        <li>Member meetings</li>
        <li>Professional developments</li>
        <li>Social events</li>
        <li>Community outreach</li>
        <li>And more!</li>
    </ul>
    <div>
        <p>
            <button class="involvementButton1"><b>LEARN MORE</b></button>&nbsp;&nbsp;
            <button class="involvementButton2" id="joinbuttonhome"><b>JOIN</b></button>
        </p>
    </div>
</div>
<div class="involvementImage-flex">
    <img src="images/Bucks_event.png" alt="AMA Event" width="100%" height="Auto" />
</div>
</div>`;

// main functions to use
// console.log(firebase);
// const mainContent = document.getElementById("main-content");
// const homeLink = document.getElementById("home-link");

// document.addEventListener("DOMContentLoaded", function () {
//   // Function to load the home page content
//   function loadHomePage(event) {
//     event.preventDefault();
//     mainContent.innerHTML = `<div class="titleContainers">
//       <div class="column column1">
//           <h1 class="title has-text-light">Welcome to <br />AMA UW-Madison</h1>
//       </div>
//       <div class="column column2">
//           <img src="images/capitalPlaceholder.png" alt="MadisonCapital" width="100%" height="100%" />
//       </div>
//     </div>
//     <div id="aboutSection" class="aboutSection-box">
//       <h2 class="primaryheader">About us</h2>
//       <p class="primaryBody">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at magni
//           porro voluptatibus, quasi doloribus provident officiis, illo hic laborum
//           distinctio mollitia quis minima ducimus.
//       </p>
//     </div>
//     <div id="involvementSection" class="involvementSection">
//       <div class="involvementText">
//           <h3 class="secondaryheader">Get involved</h3>
//           <h4 class="tertiaryHeader">Our primary events include:</h4>
//           <ul class="primaryBody">
//               <li>Member meetings</li>
//               <li>Professional developments</li>
//               <li>Social events</li>
//               <li>Community outreach</li>
//               <li>And more!</li>
//           </ul>
//           <div>
//               <p>
//                   <button class="involvementButton1"><b>LEARN MORE</b></button>&nbsp;&nbsp;
//                   <button class="involvementButton2" id="joinbuttonhome"><b>JOIN</b></button>
//               </p>
//           </div>
//       </div>
//       <div class="involvementImage-flex">
//           <img src="images/Bucks_event.png" alt="AMA Event" width="100%" height="Auto" />
//       </div>
//     </div>`;
//   }

//   // Call the loadHomePage function
//   loadHomePage(new Event("click"));

//   // Get the home link element
//   const homeLink = document.getElementById("home-link");

//   // Add an event listener to load the home page when the home link is clicked
//   homeLink.addEventListener("click", loadHomePage);
// });

// main functions for innerHTML
function r_e(id) {
  return document.querySelector(`#${id}`);
}
function appendContent(html) {
  r_e("main-content").innerHTML = html;
}

// Member drop down button
var dropdownButton = r_e("members-link");
var dropdownContent = document.querySelector(".dropdown-content");

dropdownButton.addEventListener("click", () => {
  dropdownContent.classList.remove("is-hidden");
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    dropdownContent.classList.remove("show");
  }
});

// home page
r_e("home-link").addEventListener("click", () => {
  appendContent(home_page_content);
  let check_auth = auth.currentUser;
  if (check_auth != null) {
    r_e("joinbuttonhome").classList.add("is-hidden");
  }
});

let abt_content = `<div> TESTING </div>`;

//about page
r_e("abt-link").addEventListener("click", () => {
  appendContent(abt_content);
});

// Define the functions

// Member drop down button
var dropdownButton = document.querySelector(".bttn1");
var dropdownContent = document.querySelector(".dropdown-content");

dropdownButton.addEventListener("click", function () {
  dropdownContent.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    dropdownContent.classList.remove("show");
  }
});

const calendarView = document.querySelector(".calview");
const monthSelect = r_e("month-select");
const prevMonthBtn = document.querySelector(".action_left");
const nextMonthBtn = document.querySelector(".action_right");
const yearblock = r_e("yearblock");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

let currentDate = new Date();

function generateCalendarHTML(date) {
  const totalDays = 42;
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let dayCellsGenerated = 0;
  let emptyCellsCount = 0;

  let calendarHtml = "<div class='weekdayview'>";
  for (let title = 0; title <= 6; title++) {
    calendarHtml += `<div class='dayofweek'>${dayNames[title]}</div>`;
  }
  calendarHtml += "</div><div class='monthview'><div class='weekview'>";

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarHtml += '<div class="dayview empty"></div>';
    dayCellsGenerated++;
    emptyCellsCount++;
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarHtml += `<div class="dayview">${day}</div>`;
    dayCellsGenerated++;
    if (dayCellsGenerated % 7 === 0 && dayCellsGenerated !== totalDays) {
      calendarHtml += '</div><div class="weekview">';
      emptyCellsCount = 0; // Reset empty cells count at the start of a new week
    }
  }

  while (dayCellsGenerated < totalDays) {
    calendarHtml += '<div class="dayview empty"></div>';
    dayCellsGenerated++;
    emptyCellsCount++;
    if (dayCellsGenerated % 7 === 0 && dayCellsGenerated !== totalDays) {
      calendarHtml += '</div><div class="weekview">';
      emptyCellsCount = 0; // Reset empty cells count at the start of a new week
    }
  }

  if (emptyCellsCount === 7) {
    // Remove the last weekview div if all its cells are empty
    calendarHtml = calendarHtml.substring(
      0,
      calendarHtml.lastIndexOf('<div class="weekview">')
    );
  }

  calendarHtml += "</div>"; // Close the last weekview or monthview div properly
  return calendarHtml; // Return the calendar HTML string
}

r_e("calendarbtn").addEventListener("click", () => {
  let check_auth = auth.currentUser;
  console.log("btn clicked");
  if (check_auth == null) {
    // User is not signed in
    alert("You must sign in to view the calendar.");
  } else {
    // User is signed in
    let cal_page_content = `<main>
    <div id="cal_page" class="wrapper">
      <!-- LEFT MARGIN -->
      <div class="colormargins margin-left">
        <h2 class="heading-tag-upcoming-event">Upcoming Events</h2>
        <div class="flex-container">
        <div class="box margin-event ">
        <h2>Philathropy event</h2>
        <a href="#" class="events-button" id="eventbtn1">View Event Here! </a>
        <div class="modal is-hidden" id="card_modal_1">
          <div class = "modal-background" id= "cardbg_1"></div>
          <div class="modal-content section has-background-white">
          <h2 class="secondaryheader2">Event Title</h2>
          <form>
          <p class="primaryBody">Date: [Event Date]</p>
          <p class="primaryBody">Location: [Event Location]</p>
          <button id="editEventCard">Edit</button>
          <button id="deleteEventCard">Delete</button>
          <button id="closeEventCard">Close</button>
        </form>
        </div>
        </div>
        </div>
        <div class="box margin-event">
          <h2>Professional Development event</h2>
          <a href="#" class="events-button" id="eventbtn2">View Event Here! </a>
          <div class="modal is-hidden" id="card_modal_2">
            <div class = "modal-background" id= "cardbg_2"></div>
            <div class="modal-content section has-background-white">
            <h2 class="secondaryheader2">Event Title</h2>
            <form>
            <p class="primaryBody">Date: [Event Date]</p>
            <p class="primaryBody">Location: [Event Location]</p>
            <button id="editEventCard">Edit</button>
            <button id="deleteEventCard">Delete</button>
            <button id="closeEventCard2">Close</button>
          </form>
          </div>
          </div>
          </div>
          <div class="box margin-event">
            <h2>Social event</h2>
            <a href="#" class="events-button" id="eventbtn3">View Event Here! </a>
            <div class="modal is-hidden" id="card_modal_3">
              <div class = "modal-background" id= "cardbg_3"></div>
              <div class="modal-content section has-background-white">
              <h2 class="secondaryheader2">Event Title</h2>
              <form>
              <p class="primaryBody">Date: [Event Date]</p>
              <p class="primaryBody">Location: [Event Location]</p>
              <button id="editEventCard">Edit</button>
              <button id="deleteEventCard">Delete</button>
              <button id="closeEventCard3">Close</button>
            </form>
            </div>
            </div>
            </div>
            <div class="box margin-event">
              <h2>Speaker event</h2>
              <a href="#" class="events-button" id="eventbtn4">View Event Here! </a>
              <div class="modal is-hidden" id="card_modal_4">
                <div class = "modal-background" id= "cardbg_4"></div>
                <div class="modal-content section has-background-white">
                <h2 class="secondaryheader2">Event Title</h2>
                <form>
                <p class="primaryBody">Date: [Event Date]</p>
                <p class="primaryBody">Location: [Event Location]</p>
                <button id="editEventCard">Edit</button>
                <button id="deleteEventCard">Delete</button>
                <button id="closeEventCard4">Close</button>
              </form>
              </div>
              </div>
              </div>
          
        </div>
      </div>
      <div id="sample" class="colormargins page-content">
      <div class="navcal">
        <span class="today">
          <button id="today-btn">Today</button>
        </span>
        <button class="action_left">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <select class="selectdrop" id="month-select">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button class="action_right">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <span class="yearblock">
          <button id="yearblock"></button>
        </span>
      </div>
        <div class="calview">
          <!-- Calendar view will be populated here -->
          ${generateCalendarHTML(currentDate)}
        </div>
      </div>
      <div class="colormargins margin-right">
          <a href="#" class="add-btn2" id="eventbtn">Add Event</a>
          <div class="modal is-hidden" id="popupmodal">
            <div class = "modal-background" id= "popupbg"></div>
            <div class="modal-content section has-background-white">
            <h2 class="title">New Event</h2>
            <form id="cal_form_modal">
            <div class="field">
            <label class="label" >Name of Event</label>
            <div class="control">
              <input class="input" id = "evtname" type="text" placeholder="LinkedIn Workshop" />
            </div>
            </div>
            <div class="field">
            <label class="label">Date and Time of Event</label>
            <div class="control">
              <input
                class="input"
                id = "datetime"
                type="datetime-local"
                placeholder="12-01-22 01:22"
              />
            </div>
            </div>
            <div class="field">
            <label class="label">Choose Event Category</label>
            <div class="control">
              <div class="select">
                <select name="" id="evttype">
                  <option>--select--</option>
                  <option value="">Philanthropy</option>
                  <option value="">Professional Development</option>
                  <option value="">Speaker Event</option>
                  <option value="">Social Event</option>
                </select>
              </div>
            </div>
            </div>
            <div class="field">
            <label class="label">Points Assigned</label>
            <div class="control">
              <input class="input" id = "ptsassigned" type="number" placeholder="5" />
            </div>
            </div>
            <div class="field">
            <label class="label">Description of Event</label>
            <div class="control">
              <textarea
                cols="20"
                rows="12"
                id = "descriptionevt"
                placeholder="Dress Code: Business Casual 
            Location: Grainger"
              ></textarea>
            </div>
            </div>
            <div class="field has-addons">
            <div class="control">
              <input id="codeInput" class="input" type="text" placeholder="Generate Code" />
            </div>
            <div class="control">
              <a id="generateButton" class="button btncolor">Go</a>
            </div>
            </div>
            <div class="field is-grouped">
            <div class="control">
              <button class="button" id = "addevtsbt">Submit</button>
            </div>
            <div class="control">
              <button class="button" id="addEventcncl">Cancel</button>
            </div>
            </div>
            </div>
          </form>
            </div></div>
    </div>
    </div>
  </main>`;
    appendContent(cal_page_content);
    // addEventModal
    let addEventForm = r_e("popupmodal");

    function show_addEvent_form() {
      addEventForm.classList.remove("is-hidden");
      addEventForm.classList.add("is-active");
    }

    let addEventbtn = r_e("eventbtn");
    addEventbtn.addEventListener("click", show_addEvent_form);

    let addEventcancel = r_e("addEventcncl");
    addEventcancel.addEventListener("click", () => {
      addEventForm.classList.remove("is-active");
    });
    const addevtsbt = r_e("addevtsbt");
    let evtname = r_e("evtname");
    let evttime = r_e("datetime");
    let evttype = r_e("evttype");
    let ptsassigned = r_e("ptsassigned");
    let descriptionevt = r_e("descriptionevt");

    addevtsbt.addEventListener("click", (e) => {
      console.log("eventsbtnclicked");
      e.preventDefault();
      let name = evtname.value;
      let time = evttime.value;
      let type = evttype.value;
      let pts = ptsassigned.value;
      let desc = descriptionevt.value;
      let event = {
        name: name,
        time: time,
        type: type,
        pts: pts,
        desc: desc,
      };
      db.collection("events")
        .add(event)
        .then(() => alert("Event added to database"))
        .catch((error) => console.error("Error adding event: ", error));
      addEventForm.classList.remove("is-active");
    });
    // Function to generate a random code
    function generateRandomCode(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < length; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return code;
    }

    // Function to update the input field with the generated code
    function updateCodeInput() {
      const codeInput = document.getElementById("codeInput");
      const randomCode = generateRandomCode(8); // Generate a random 8-character code (adjust length as needed)
      codeInput.value = randomCode;
    }
    // // eventcardModal

    const viewEventLinks = document.querySelectorAll(".events-button");
    const eventCard = document.getElementById("eventCard");
    const closeEventCardBtn = document.getElementById("eventCard");

    let eventCard1 = r_e("card_modal_1");
    let eventbtn1 = r_e("eventbtn1");
    let eventclose1 = r_e("closeEventCard");

    function showEventCard1() {
      eventCard1.classList.remove("is-hidden");
      eventCard1.classList.add("is-active");
    }
    eventbtn1.addEventListener("click", showEventCard1);

    eventclose1.addEventListener("click", () => {
      eventCard1.classList.remove("is-active");
    });
    // eventcardModal2
    let eventCard2 = r_e("card_modal_2");
    let eventbtn2 = r_e("eventbtn2");
    let eventclose2 = r_e("closeEventCard2");

    function showEventCard2() {
      eventCard2.classList.remove("is-hidden");
      eventCard2.classList.add("is-active");
    }
    eventbtn2.addEventListener("click", showEventCard2);

    eventclose2.addEventListener("click", () => {
      eventCard2.classList.remove("is-active");
    });

    // / eventcardModal3
    let eventCard3 = r_e("card_modal_3");
    let eventbtn3 = r_e("eventbtn3");
    let eventclose3 = r_e("closeEventCard3");

    function showEventCard3() {
      eventCard3.classList.remove("is-hidden");
      eventCard3.classList.add("is-active");
    }
    eventbtn3.addEventListener("click", showEventCard3);

    eventclose3.addEventListener("click", () => {
      eventCard3.classList.remove("is-active");
    });

    // / eventcardModal4
    let eventCard4 = r_e("card_modal_4");
    let eventbtn4 = r_e("eventbtn4");
    let eventclose4 = r_e("closeEventCard4");

    function showEventCard4() {
      eventCard4.classList.remove("is-hidden");
      eventCard4.classList.add("is-active");
    }
    eventbtn4.addEventListener("click", showEventCard4);

    eventclose4.addEventListener("click", () => {
      eventCard4.classList.remove("is-active");
    });

    // Add an event listener to the close button
    document
      .getElementById("closeAddEventsPopup")
      .addEventListener("click", closeAddEventsPopup);

    // Function to close the add events popup
    function closeAddEventsPopup() {
      var addEventsPopup = document.getElementById("addEventsPopup");
      addEventsPopup.style.display = "none";
    }

    // Show the event card when any "View Event Here" link is clicked
    viewEventLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        eventCard.classList.remove("hidden");
      });
    });

    // Close the event card when the close button is clicked
    closeEventCardBtn.addEventListener("click", function () {
      eventCard.classList.add("hidden");
    });
  }
});

// points page content
r_e("pointbtn").addEventListener("click", () => {
  let check_auth = auth.currentUser;
  if (check_auth == null) {
    signup_modal.classList.add("is-active");
  }
  if (check_auth != null) {
    let points_content = `<div class="filter-container">
    <label for="nameSearch">Search by Name:</label>
    <input type="text" id="nameSearch" placeholder="Search name...">
    <label for="semesterFilter">Filter by Semester:</label>
    <select id="semesterFilter">
        <option value="">All</option>
        <option value="Fall 2023">Fall 2023</option>
        <option value="Spring 2024">Spring 2024</option>
        <option value="Fall 2024">Fall 2024</option>
        <option value="Spring 2025">Spring 2025</option>
        <!-- Add more options as needed -->
    </select>
    <!-- <label for="eventFilter">Filter by Event:</label>
    <select id="eventFilter">
        <option data-event="Total Points">All</option>
        <option data-event="Philanthropy Points">Philanthropy Points</option>
        <option data-event="Developement Points">Developement Points</option>
        <option data-event="Social Points">Social Points</option>
        <option data-event="Speaker Points">Speaker Points</option>
    </select> -->
    <button id="applyFilters">Apply Filters</button>
</div>                 
<table>
    <thead>
        <tr>
            <th>Member</th>
            <th>Semester</th>
            <th>Philanthropy Points</th>
            <th>Developement Points</th>
            <th>Social Points</th>
            <th>Speaker Points</th>
            <th>Total Points</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John Doe</td>
            <td>Spring 2024</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>Jane Smith</td>
            <td>Spring 2024</td>
            <td>2</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>Michael Johnson</td>
            <td>Spring 2025</td>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>Emma Lee</td>
            <td>Spring 2024</td>
            <td>3</td>
            <td>12</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>Emma Lee</td>
            <td>Fall 2024</td>
            <td>3</td>
            <td>3</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>X</td>
            <td>Fall 2023</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>X</td>
            <td>Spring 2024</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td></td>
        </tr>
        <tr>
            <td>X</td>
            <td>Spring 2024</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>X</td>
            <td>Spring 2024</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>0</td>
            <td></td>
        </tr>
        <tr>
            <td>X</td>
            <td>Spring 2024</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>X</td>
            <td>Fall 2024</td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>X</td>
            <td>Fall 2024</td>
            <td>3</td>
            <td>4</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
    </tbody>
</table>`;

    appendContent(points_content);
  }
});
let blog_content = `<div class="container my-4">
<div class="card">
  <header class="card-header">
    <p class="card-header-title">Blog Title</p>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, aspernatur? Nobis perspiciatis illum incidunt vero quia doloribus assumenda aperiam. Culpa quidem porro harum tenetur maxime repellat doloremque, quod iusto alias reiciendis minima placeat. Autem impedit unde ducimus, maxime voluptatibus, ut vitae at ratione harum iure optio ullam quidem repellendus? Architecto rem consectetur, dolore praesentium similique unde eius? Eveniet, fuga eum quasi veritatis repellendus soluta dignissimos porro cum, tenetur quisquam repudiandae dolore. Aspernatur, explicabo amet. Eius voluptatibus tempora sunt inventore ipsam laborum, reprehenderit libero voluptate aperiam, nesciunt harum deserunt aspernatur eaque magni commodi. Sit illum totam assumenda! Voluptatum tempora ex temporibus!
      <br />
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer>
</div>
</div> 
<div class="container my-4">
<div class="card">
  <header class="card-header">
    <p class="card-header-title">Blog Title</p>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, aspernatur? Nobis perspiciatis illum incidunt vero quia doloribus assumenda aperiam. Culpa quidem porro harum tenetur maxime repellat doloremque, quod iusto alias reiciendis minima placeat. Autem impedit unde ducimus, maxime voluptatibus, ut vitae at ratione harum iure optio ullam quidem repellendus? Architecto rem consectetur, dolore praesentium similique unde eius? Eveniet, fuga eum quasi veritatis repellendus soluta dignissimos porro cum, tenetur quisquam repudiandae dolore. Aspernatur, explicabo amet. Eius voluptatibus tempora sunt inventore ipsam laborum, reprehenderit libero voluptate aperiam, nesciunt harum deserunt aspernatur eaque magni commodi. Sit illum totam assumenda! Voluptatum tempora ex temporibus!
      <br />
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer>
</div>
</div> 
<div class="container my-4">
<div class="card">
  <header class="card-header">
    <p class="card-header-title">Blog Title</p>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, aspernatur? Nobis perspiciatis illum incidunt vero quia doloribus assumenda aperiam. Culpa quidem porro harum tenetur maxime repellat doloremque, quod iusto alias reiciendis minima placeat. Autem impedit unde ducimus, maxime voluptatibus, ut vitae at ratione harum iure optio ullam quidem repellendus? Architecto rem consectetur, dolore praesentium similique unde eius? Eveniet, fuga eum quasi veritatis repellendus soluta dignissimos porro cum, tenetur quisquam repudiandae dolore. Aspernatur, explicabo amet. Eius voluptatibus tempora sunt inventore ipsam laborum, reprehenderit libero voluptate aperiam, nesciunt harum deserunt aspernatur eaque magni commodi. Sit illum totam assumenda! Voluptatum tempora ex temporibus!
      <br />
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer>
</div>
</div> `;
// Blog page content
r_e("blog-link").addEventListener("click", () => {
  appendContent(blog_content);
  let check_auth = auth.currentUser;
  if (check_auth == null) {
    signup_modal.classList.add("is-active");
  }
  if (check_auth != null) {
    appendContent(blog_content);
  }
});

// contact page content
let contact_content = `<div id="contactSectionTop" class="contactSection-box contactTopFormat">
<h2 class="primaryheader">Let's get in touch.</h2>
<h3 class="tertiaryHeader">
  <a href="mailto:amauwmadison@gmail.com">amauwmadison@gmail.com</a>
</h3>

<div class="social-icons-container">
  <a
    href="mailto:amauwmadison@gmail.com"
    class="social-icon"
    title="Email"
  >
    <i class="fas fa-envelope fa-2x"></i>
  </a>
  <a
    href="https://www.instagram.com/amabadgers/"
    class="social-icon"
    title="Instagram"
  >
    <i class="fab fa-instagram fa-2x"></i>
  </a>
  <a
    href="https://www.linkedin.com/in/ama-badgers-5247a9252/"
    class="social-icon"
    title="LinkedIn"
  >
    <i class="fab fa-linkedin fa-2x"></i>
  </a>
  <a
    href="https://www.tiktok.com/@ama.badgers"
    class="social-icon"
    title="TikTok"
  >
    <i class="fab fa-tiktok fa-2x"></i>
  </a>
</div>
</div>

<div id="contactFormSection" class="contactFormSection">
<div class="contactFormText">
  <h3 class="secondaryheader">Have a question?</h3>
  <h4 class="tertiaryHeader">
    Contact us through this form and we'll get back to you shortly.
  </h4>
</div>
<div class="contactForm-flex">
  <form action="https://api.web3forms.com/submit" method="POST">
    <input
      type="hidden"
      name="access_key"
      value="a4172b4c-7ec1-4f25-824e-9653e33b2437"
      class="contact-form"
      data-reveal="right"
    />
    <div class="field is-horizontal">
      <div class="input-wrapper">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="First and Last Name *"
          required
          class="input-field"
        />
      </div>
      <div class="input-wrapper">
        <input
          id="name"
          type="email"
          name="email_address"
          placeholder="Email *"
          required
          class="input-field"
        />
      </div>
    </div>

    <textarea
      id="message"
      name="message"
      placeholder="Message *"
      required
      class="input-field"
    ></textarea>

    <button type="submit" class="contactBtn" id="submit">
      Send Message
    </button>
  </form>
</div>
</div>`;
r_e("contact-link").addEventListener("click", () => {
  appendContent(contact_content);
  let check_auth = auth.currentUser;
  if (check_auth == null) {
    signup_modal.classList.add("is-active");
  }
  if (check_auth != null) {
    appendContent(contact_content);
  }
});

// JavaScript to handle the burger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const loginSignupBurger = document.querySelector(".login-signup-burger");
  const backgroundDiv = document.querySelector(".background-div");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    loginSignupBurger.classList.toggle("active"); // Toggle login and signup in burger menu
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      burger.classList.remove("active");
      menu.classList.remove("active");
      loginSignupBurger.classList.remove("active"); // Remove active class on resize
    }
  });
});

// console.log(firebase);
// authentication

// expand burger
let burger_stack = documentquerySelector("#burger_stack");
let burger_menu = document.q.uerySelector("#burger_menu");
let home_burger = document.querySelector("#home-link");
let about_burger = document.querySelector("#abt-link");
let members_burger = document.querySelector("#members-link");
let blog_burger = document.querySelector("#blog-link");
let contact_burger = document.querySelector("#contact-link");
function expand_burger() {
  burger_menu.classList.toggle("is-active");
  burger_menu.classList.toggle("has-background-light");
  burger_stack.classList.toggle("is-active");
  home_burger.classList.toggle("has-text-light");
  about_burger.classList.toggle("has-text-light");
  members_burger.classList.toggle("has-text-light");
  blog_burger.classList.toggle("has-text-light");
  contact_burger.classList.toggle("has-text-light");
}
burger_stack.addEventListener("click", expand_burger);
