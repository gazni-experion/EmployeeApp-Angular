import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //retrieve all data from get method getAllEmployees   --HttpClient
  employees: Employee[];  //all employees details
  formData: Employee = new Employee();    //One employee details

  constructor(private httpClient: HttpClient) { }

  //Get all employees
  getAllEmployees(): Observable<any> {
    //https://localhost:44356/api/employees --------Environment
    return this.httpClient.get(environment.apiUrl + '/api/employees');
  }

  bindListEmployees() {
    return this.httpClient.get(environment.apiUrl + '/api/employees')
      .toPromise().then(
        response => {
          console.log("from service");
          console.log(response);
          this.employees = response as Employee[]
        }
      );
  }


  //Get employee by id



  //Insert Employee



  //Update Employee


  //Delete Employee
deleteEmployee(id: number){
  return this.httpClient.delete(environment.apiUrl+'/api/employees/'+id);
}

}
