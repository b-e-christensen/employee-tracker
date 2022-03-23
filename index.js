// requiring packages
const inquirer = require('inquirer');

const { viewTable, addDepartment, addEmployee, addRole, callItQuits } = require('./queries/queries')

//  FLOW -----> 
// user chooses action 
// switch/case function to read action chosen and run the corresponding function
// next steps determined by which action was chosen
// after action's path is finished run choose action again with switch case. 

chooseAction = () => {
  return inquirer.prompt([
      {
          type: 'list',
          name: 'action',
          message: 'What action would you like to take?',
          choices: [ 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'No further actions']
      },
  ])
}

actionPath = (param) => {
  switch (param.action) {
    case 'View all departments':
    viewTable('departments');
    break;
    case 'View all roles':
    viewTable('roles');
    break;
    case 'View all employees':
    viewTable('employees');
    break;
    case 'Add a department':
    addDepartment();
    break;
    case 'Add a role':
    addRole();
    break;
    case 'Add an employee':
    addEmployee();
    break;
    case 'Update employee role':
    updateEmployeeRole();
    break;
    case 'No further actions':
    callItQuits();
    break;
  }
}

async function init () {

  let action = await chooseAction()
  console.log(action)

  actionPath(action)
}

init()
