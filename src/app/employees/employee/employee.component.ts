import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {

  constructor(public empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.bindListDepartments();
  }

  //Submit form
  onSubmit(form: NgForm) { 
    console.log(form.value);
    let addId = this.empService.formData.EmployeeId;
    
    //Insert or update
    if (addId == 0 || addId == null) { 

      //Insert
      this.insertEmployeeRecord(form);
    } else {
      //Update
    }
  }

  //Insert Method
  insertEmployeeRecord(form?: NgForm) { 
    console.log("Inserting a record....");
    this.empService.insertEmployee(form.value).subscribe(res => {
      console.log(res);
    },
      err => { 
        console.log(err);
      }
    );
  }
}
