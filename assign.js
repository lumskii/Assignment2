/* 

Creating an employees Menu app
This app will allow employees belong to different teams in the office.

*/

// this is the employee class
class Employee {
    constructor(name,position) {
        this.name = name;
        this.position = position;
    }

    // showing brief description of the employee
    describe() {
        return `${this.name} works in ${this.position}.`;
    }
}

// this is the class for various teams that will be created by the user
class Team {
    constructor(name) {
        this.name = name;
        this.employees = [];
    }

    //adding new employee
    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error(`You can only add an instance of Employee. Argument is not an Employee: ${employee}`);
        }
    }

    describe() {
        return `${this.name} has ${this.employees.length} employees.`;
    }
}

// this is the menu class that would be displayed once the app is launched
class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

    // this is the main menu option
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4': 
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            Employees Menu App
            ----------------------
            0) Exit
            1) Create New Team
            2) View Team
            3) Delete Team
            4) Display All Teams
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
            ${teamInfo}
            ---------------------
            0) Back
            1) Add Employee
            2) Delete Employee
            ----------------------   
        `);
    }

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    viewTeam() {
        let index = prompt('Enter the index of the team you want to view:');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam =this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name +'\n';

            for (let i = 0; i < this.selectedTeam.employees.length; i++) {
                description += i + ') ' + this.selectedTeam.employees[i].name 
                + ' - ' + this.selectedTeam.employees[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            }
        }
    }

    // this is an instance for deleting a team in the app
    deleteTeam() {
        let index = prompt('Enter the index of the team you want to delete:');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    //this is an instance for adding new employee and position
    createEmployee(){
        let name = prompt('Enter name for new employee:');
        let position = prompt('Enter position of new employee:');
        this.selectedTeam.employees.push(new Employee(name, position));
    }

    // this deletes an employee
    deleteEmployee() {
        let index = prompt('Enter the index of the Employee you wish to delete:');
        if (index > -1 && index < this.selectedTeam.employees.length) {
            this.selectedTeam.employees.splice(index, 1);
        }
    }
}

let menu =new Menu();
menu.start();