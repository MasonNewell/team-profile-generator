const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { choices } = require("yargs");
const { TestWatcher } = require("@jest/core");

// Manager info
const managerInfo = {
  name: [],
  title: [],
  employeeId: [],
  email: [],
  officeNumber: [],
};

// Intern info
const internInfo = {
  name: [],
  title: [],
  employeeId: [],
  email: [],
  school: [],
};

// Engineer info
const engineerInfo = {
  name: [],
  title: [],
  employeeId: [],
  email: [],
  GitHub: [],
};

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
            name: "engineer",
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
      managerInfo.name.push(data.employeeName);
      managerInfo.title.push(oldData.employeeTitle);
      managerInfo.employeeId.push(data.employeeId);
      managerInfo.email.push(data.employeeEmail);
      managerInfo.officeNumber.push(data.officeNumber);
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
      internInfo.name.push(data.employeeName);
      internInfo.title.push(oldData.employeeTitle);
      internInfo.employeeId.push(data.employeeId);
      internInfo.email.push(data.employeeEmail);
      internInfo.school.push(data.school);
      addNewEmployee();
    });
}

// Option 3: Add an Engineer to team
function getEngineerInfo(data) {
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
      engineerInfo.name.push(data.employeeName);
      engineerInfo.title.push(oldData.employeeTitle);
      engineerInfo.employeeId.push(data.employeeId);
      engineerInfo.email.push(data.employeeEmail);
      engineerInfo.GitHub.push(data.GitHub);
      addNewEmployee();
    });
}

// create HTML with team info
function showTeam() {
  // Manager card(s)
  // Engineer card(s)
  // Intern card(s)
}

// run program
addNewEmployee();
