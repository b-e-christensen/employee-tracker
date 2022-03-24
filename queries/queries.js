
const db = require('../config/connection')
const { addDepartmentPrompt, addEmployeePrompt, addRolePrompt, chooseAction, updateEmployeeRolePrompt } = require('./prompts')

// inits app on npm start -- also re runs app after each function
async function init () {
    let action = await chooseAction()
    actionPath(action)
  }

// takes in first user inpt of which action they want to take and directs the flow into the corresponding functions
function actionPath(param) {
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
      case 'Add an employee':
      addEmployee();
      break;
      case 'Add a role':
      addRole();
      break;
      case 'Update employee role':
      updateEmployeeRole();
      break;
      case 'No further actions':
      callItQuits();
      break;
    }
  }

// function to view any table from the data base -- logs line breaks for a cleaner view of the printed table. re-inits the app. 
async function viewTable(table) {
    let results = await db.promise().query(`SELECT * FROM ${table}`)
    console.log('\n')
    console.table(results[0]);
    console.log('\n')
    await init()
  }

// adds department to department table. runs viewTable function to see the newly updated department (and to also re-init the app)
async function addDepartment () {
    let answers = await addDepartmentPrompt()
    await db.promise().query(`INSERT INTO departments (name) VALUES ('${answers.department}')`)
    viewTable('departments')
}

// adds employee to employee table. runs viewTable to see updated table and re-init
async function addEmployee () {
    let roleArray = []
    let employeesArray= []
    await populateRolesArray(roleArray)
    await populateEmployeesArray(employeesArray)
    let answers = await addEmployeePrompt(roleArray, employeesArray)
    let manager = await answers.manager
    let role = await answers.role
    let managerId

    if (manager == 'No one'){
        managerId = null
    } else {
     managerId = await findId('employees', 'last_name', manager.split(' ')[1])
    }
    let roleId = await findId('roles', 'title', role)

    await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ('${answers.firstName}', '${answers.lastName}', ${roleId}, ${managerId})`)
    viewTable('employees')
}

// adds a new role to role table. shows role table and re-inits
async function addRole () {
    let departmentsArr = []
    await populateDepartmentsArray(departmentsArr)
    let answers = await addRolePrompt(departmentsArr)
    let departmentId = await findId('departments', 'name', answers.department)

    await db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${departmentId})`)
    viewTable('roles')
}

// updates an employee role. prints employee table and re inits the app
async function updateEmployeeRole() {
    let employeesArr = []
    let rolesArr = []

    await populateEmployeesArray(employeesArr)
    await populateRolesArray(rolesArr)

    let answers = await updateEmployeeRolePrompt(employeesArr, rolesArr)
    let roleId = await findId('roles', 'title', answers.role)
    let employeeId = await db.promise().query(`SELECT id FROM employees WHERE first_name = '${answers.employee.split(' ')[0]}' AND last_name = '${answers.employee.split(' ')[1]}'`)

    await db.promise().query(`UPDATE employees SET role_id = '${roleId}' WHERE id = '${employeeId[0][0].id}'`)
    viewTable('employees')
}

// exits the app
function callItQuits() {
    process.exit()
}

// grabs roles data from the database to make an array of all the roles to populate choices array in inquirer prompt
async function populateRolesArray(arr) {
    let roles = await db.promise().query(`SELECT title FROM roles`)
    roles[0].forEach(element => arr.push(element.title))
}

// grabs departments data from the database to make an array of all the departments to populate choices array in inquirer prompt
async function populateDepartmentsArray(arr) {
    let roles = await db.promise().query(`SELECT name FROM departments`)
    roles[0].forEach(element => arr.push(element.name))
}

// grabs employees data from the database to make an array of all the employees to populate choices array in inquirer prompt
async function populateEmployeesArray(arr) {
    let employees = await db.promise().query('SELECT CONCAT(first_name,\' \',last_name) AS full_name FROM employees;')
    employees[0].forEach(element => arr.push(element.full_name))
}

// finds id of something from any table/column that
async function findId(table, column, value) {
    let results = await db.promise().query(`SELECT id FROM ${table} WHERE ${column} = '${value}'`)
    let returnedId = results[0][0].id
    return returnedId
}



module.exports = {
    actionPath,
    init
}