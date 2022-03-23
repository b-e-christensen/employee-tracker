const inquirer = require('inquirer')


// const { viewTable, addDepartment, addEmployee, addRole, callItQuits } = require('./queries')

function chooseAction() {
  return inquirer.prompt([
      {
          type: 'list',
          name: 'action',
          message: 'What action would you like to take?',
          choices: [ 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'No further actions']
      },
  ])
}

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
  // to add option of no manager
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

  function addRolePrompt(departments) {
    return inquirer.prompt([
      {
          type: 'input',
          name: 'title',
          message: 'What is the name of the new role?'
      },
      {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the new role?'
      },
      {
          type: 'list',
          name: 'department',
          message: 'What department does this role belong to?',
          choices: departments
      },
  ])
  }

  function updateEmployeeRolePrompt(employees, roles) {
    return inquirer.prompt([
      {
          type: 'list',
          name: 'employee',
          message: 'Which employee\'s role do you want to update?',
          choices: employees
      },
      {
          type: 'list',
          name: 'role',
          message: 'What do you want to change their role to?',
          choices: roles
      },
  ])
  }
  
  module.exports = {
    addDepartmentPrompt,
    addEmployeePrompt,
    addRolePrompt,
    chooseAction,
    updateEmployeeRolePrompt
  }