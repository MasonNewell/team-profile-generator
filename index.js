const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { choices } = require("yargs");
const { TestWatcher } = require("@jest/core");
const teamList = [];

// Add employee, or NONE to continue
function addNewEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeTitle",
        message: "Select employee type to add, or NONE to continue",
        choices: [
          {
            name: "Manager",
            value: "Manager",
          },
          {
            name: "Intern",
            value: "Intern",
          },
          {
            name: "Engineer",
            value: "Engineer",
          },
          {
            name: "NONE",
            value: "NONE",
          },
        ],
      },
    ])
    .then((data) => {
      // Manager
      if (data.employeeTitle === "Manager") {
        getManagerInfo(data);
      }
      // Intern
      else if (data.employeeTitle === "Intern") {
        getInternInfo(data);
      }
      // Engineer
      else if (data.employeeTitle === "Engineer") {
        getEngineerInfo(data);
        // NONE
      } else showTeam();
    });
}

// Option 1: Add a Manager to team
function getManagerInfo(oldData) {
  inquirer
    .prompt([
      {
        name: "employeeName",
        message: "Enter Manager name:",
      },
      {
        name: "employeeId",
        message: "Enter the Manager's ID: ",
      },
      {
        name: "employeeEmail",
        message: "Enter the email address for this Manager: ",
      },
      {
        name: "officeNumber",
        message: "Enter the office number for this Manager: ",
      },
    ])
    .then((data) => {
      const manager = new Manager(
        data.employeeName,
        data.employeeId,
        data.employeeEmail,
        data.officeNumber
      );
      teamList.push(manager);
      addNewEmployee();
    });
}

// Option 2: Add an Intern to team
function getInternInfo(oldData) {
  inquirer
    .prompt([
      {
        name: "employeeName",
        message: "Enter Intern's name: ",
      },
      {
        name: "employeeId",
        message: "Enter the Intern's ID number: ",
      },
      {
        name: "employeeEmail",
        message: "Enter the email address for this Intern: ",
      },
      {
        name: "school",
        message: "Enter the Intern's school name: ",
      },
    ])
    // Add intern to intern object
    .then((data) => {
      const intern = new Intern(
        data.employeeName,
        data.employeeId,
        data.employeeEmail,
        data.school
      );
      teamList.push(intern);
      addNewEmployee();
    });
}

// Option 3: Add an Engineer to team
function getEngineerInfo(oldData) {
  inquirer
    .prompt([
      {
        name: "employeeName",
        message: "Enter Engineer's name: ",
      },
      {
        name: "employeeId",
        message: "Enter the Engineer's ID number: ",
      },
      {
        name: "employeeEmail",
        message: "Enter the email address for this Engineer: ",
      },
      {
        name: "GitHub",
        message: "Enter the Engineer's GitHub: ",
      },
    ])
    // Add engineer to engineer object
    .then((data) => {
      const engineer = new Engineer(
        data.employeeName,
        data.employeeId,
        data.employeeEmail,
        data.GitHub
      );
      teamList.push(engineer);
      addNewEmployee();
    });
}

// create HTML with team info
function showTeam() {
  // iterate through array of objects (manager, intern, engineer)
  let html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <title>My Team</title>
  </head>
  <body>
  <main class="d-flex justify-content-center">
  <section class="row justify-content-center container card-container">`;
  for (let value of teamList) {
    html += `
    <div class="rounded col-12 col-xl-4 col-md-6 py-5">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title">${value.getName()}</h5>
        <h6 class="card-subtitle mb-2">${value.getRole()}</h6>
      </div>
      <div class="card-body">
        <ul class="list-group my-3">
          <li class="list-group-item"><p class="card-text">ID: ${value.getId()}</p></li>
          <li class="list-group-item">Email: <a href="mailto:${value.getEmail()}" class="card-link">${value.getEmail()}</a></li>
          <li class="list-group-item">${
            value.hasOwnProperty("officeNumber")
              ? "Office number: " + value.officeNumber
              : value.hasOwnProperty("school")
              ? "School: " + value.school
              : value.hasOwnProperty("github")
              ? `GitHub: <a href="https://github.com/${value.github}" target="_blank" class="card-link">` +
                value.github +
                `</a>`
              : ""
          }          
          </li>
        </ul>
      </div>
    </div>
  </div>`;
  }
  html += `
  </section>
  </main>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"
  ></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  </body>`;

  fs.writeFile("Demo.html", html, (err) => (err ? console.log(err) : console.log("Success!")));
}
// run program
addNewEmployee();
