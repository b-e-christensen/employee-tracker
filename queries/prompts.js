const inquirer = require('inquirer')

const { populateRolesArray } = require('./queries')



function addDepartmentPrompt() {
    return inquirer.prompt([
      {
          type: 'input',
          name: 'department',
          message: 'What is the name of the new department?'
      },
  ])
  }

function addEmployeePrompt(roles, employees) {
    console.log('logging from prompts' + ' ' + roles)
    employees.push('No one')

    return inquirer.prompt([
      {
          type: 'input',
          name: 'firstName',
          message: 'What is the employee\'s first name?'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?'
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is their role?',
        choices: roles

    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is their manager?',
        choices: employees
    },
  ])
  }
  
  module.exports = {
    addDepartmentPrompt,
    addEmployeePrompt
  }