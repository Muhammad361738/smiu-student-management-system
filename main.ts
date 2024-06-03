import inquirer from "inquirer";

// Define class 
class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: String[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100
    }
    // Method To enroll student in course 
    enroll_course(course: string) {
        this.courses.push(course)
    }
    // Method to view student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    // Method to pay fees
    pay_fees(amount: number) {
        this.balance -= amount
        console.log(`$${amount} Fees paid Successfully for ${this.name}`)
        console.log(`Remaining Balance is : $${this.balance}`);
        
        
        
    }
    // Method to show student status
    show_status() {
        console.log(`ID :${this.id}`)
        console.log(`Name  :${this.name}`)
        console.log(`Courses :${this.courses}`)
        console.log(`Balance :${this.balance}`)
    }
}
// Defining a student manager class to manage students
class Student_manager {
   
    students: Student[]
    constructor() {
        this.students = []
    }
    
    // Method to add new students
    add_students(name: string) {
        let student = new Student(name);
        this.students.push(student)
        console.log(`Student ${name} added Successfully. Student ID: ${student.id}`)
    }
    // Method to enroll student in course 
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id);//                           56 blander
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} Successfully`)
        }
    }
    // Method to view student balance
    view_Student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        } else {
            console.log("Student not found please enter correct student ID")
        }
    }
    // Method to pay student fees
    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found please enter correct student ID")
        }
    }
    // method to display student status
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status()
        }
    }
    // Method to find student by student id 
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id)
    }
}
// main function 
async function main() {
    console.log("Welcome To Muhammad Talha - Student Management System")
    console.log("-".repeat(60))

    let student_manager= new Student_manager();
    // While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt(
            {
                name: "choice",
                type : "list",
                message: "Select an Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Satus",
                    "Exist"
                ]
            }
        );
        // using switch case to manage user input
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name",
                    }
                ]);
                student_manager.add_students(name_input.name)
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name "

                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course)
                break;

                case "View Student Balance":
                    let balance_input = await inquirer.prompt([
                        {
                            name : "student_id",
                            type : "number",
                            message: "Enter a student ID"
                        }
                    ])
                    student_manager.view_Student_balance(balance_input.student_id);
                    break;

                    case "Pay Fees":
                        let fees_input = await inquirer.prompt([
                            {
                                name : "student_id",
                                type : "number",
                                message : "Enter the student ID "
                            },
                            {
                                name : "amount",
                                type: "number",
                                message: "Enter the amount to pay"
                            }
                        ]);

                        student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                        break;

                        case "Show Satus":
                            let status_input = await inquirer.prompt([
                                {
                                    name : "student_id",
                                    type: "number",
                                    message: "Enter the student ID "
                                }
                            ])
                            student_manager.show_student_status(status_input.student_id);
                            break;
                            case "Exist":
                                console.log("Existing .......");
                                process.exit();
                                
        }
    }
}
// calling a main function 
main()