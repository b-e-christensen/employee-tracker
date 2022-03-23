
const db = require('../config/connection')
const { addDepartmentPrompt, addEmployeePrompt } = require('./prompts')

function viewTable(table) {
    db.query(`SELECT * FROM ${table}`, function(err, results) {
    console.table(results);
    })
  }

async function addDepartment (answers) {
    let results = await addDepartmentPrompt()
    db.query(`INSERT INTO departments (name) VALUES (${results.department})`, function (err, results) {
    console.log(results);
    })
}

async function addEmployee () {
    let roleArray = []
    let employeesArray= []
    await populateRolesArray(roleArray)
    await populateEmployeesArray
    await console.log(roleArray)
    let answers = await addEmployeePrompt(roleArray, employeesArray)
    let manager = await answers.manager
    let role = await answers.role

    let managerId
    let roleId

    if (manager === 'No one') {
        managerId = 0
    } else  {
        db.query(`SELECT * FROM employees WHERE first_name = ? AND last_name = ?`, [manager.split(' ')[0], manager.split(' ')[1]], (err, results) => {
            if (err) {
                console.log(err)
            }
             managerId = results[0].id
        })
    }

    db.query(`SELECT * FROM roles WHERE title = ?`, role, (err, results) => {
        if (err) {
            console.log(err)
        }
        roleId = results[0].id
    })

    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${answers.firstName}, ${answers.lastName}, ${roleId}, ${managerId})`, function (err, results) {
        console.log(results);
        })

}

function addRole (answers) {
    let departmentId

    db.query(`SELECT * FROM departments WHERE name = ?`, answers.department, (err, results) => {
        if (err) {
            console.log(err)
        }
        departmentId = results[0].id
    })

    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (${answers.title}, ${answers.salary}, ${departmentId})`, function (err, results2) {
        console.log(results2);
        })
    
}

function updateEmployeeRole() {
    
}

function callItQuits() {
    console.log('quit')
    process.exit()
}

async function populateRolesArray(arr) {
    console.log('array should be populated')
    let roles = await db.promise().query('SELECT title FROM roles')
    roleObjArr = roles[0].forEach(element => arr.push(element.title))
}




module.exports = {
    viewTable,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployeeRole,
    callItQuits,
    populateRolesArray
}