import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  //declare variable
  page: number=1;
  filter: string;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {      //Life Cycle Hook

    console.log("Welcome to Life Cycle Hook");
    // this.getEmployees();
    this.employeeService.bindListEmployees();
  }

  //Get all Employees
  getEmployees(){
    this.employeeService.getAllEmployees().subscribe(

      response => {
        console.log('retrieving from list');
        console.log(response);
      },
      error => {
        console.log('Something wrong');
        console.log(error);}
    );
  }

  //Edit employee
  updateEmployee(empId: number){
    console.log(empId);
    //Navigate to edit form with selected employee details
  }
  
  //Delete employee
  deleteEmployee(empId: number){
    if (confirm('Are you sure you want to DELETE this record?')) {
      this.employeeService.deleteEmployee(empId).subscribe(
        response =>{
          this.employeeService.bindListEmployees();
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

}
