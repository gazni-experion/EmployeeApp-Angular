import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {

  //Declare variable
empId:number;

  constructor(public empService: EmployeeService,
    private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //Get departments
    this.empService.bindListDepartments();

    //Get empId from ActivatedRoute
    this.empId = this.route.snapshot.params['empId'];

    //Get employee by id
    if (this.empId != 0 || this.empId != null) {

      //Get employee by id
      this.empService.getEmployeeById(this.empId).subscribe(
          response =>{
          console.log(response);

          //Format date
          var datePipe = new DatePipe("en-UK");
          let formattedDate:any =datePipe.transform(response.DateOfJoining, 'yyyy-MM-dd');
          response.DateOfJoining = formattedDate;
          //Assign this response to empservice formData
          this.empService.formData = Object.assign({}, response);
        },
        error => {
          console.log(error);
        }
        
      );
    }
  }

  //Submit form
  onSubmit(form: NgForm) { 
    console.log(form.value);
    let addId = this.empService.formData.EmployeeId;
    
    //Insert or update
    if (addId == 0 || addId == null) { 

      //Insert
      this.insertEmployeeRecord(form);
      this.resetForm(form);
      this.router.navigateByUrl('employee-list');
    } else {
      //Update
      this.updateEmployeeRecord(form);
      this.resetForm(form);
      this.router.navigateByUrl('employee-list');
    }
  }

  //Insert Method
  insertEmployeeRecord(form?: NgForm) { 
    console.log("Inserting a record....");
    this.empService.insertEmployee(form.value).subscribe(res => {
      console.log(res);
      this.toastr.success('Employee record Inserted Successfully', 'Employee App V2022');
    },
      err => { 
        console.log(err);
      }
    );
  }

  //Update Method
  updateEmployeeRecord(form?: NgForm) { 
    console.log("Updating a record....");
    this.empService.updateEmployee(form.value).subscribe(res => {
      console.log(res);
      this.toastr.success(
        'Employee record Updated Successfully',
        'Employee App V2022'
      );
    },
      err => { 
        console.log(err);
      }
    );
  }

  //Clear all contents after submit
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
}
