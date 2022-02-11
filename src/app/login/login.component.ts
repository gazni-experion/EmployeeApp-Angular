import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Declare variables
  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser: any = new User();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    
    //Create a Reactive Form Model
    this.loginForm = this.formBuilder.group({

      //Form controlName fields
      UserName: ['',[Validators.required]],
      UserPassword: ['',[Validators.required,Validators.minLength(3)]]
    });
  }

  //Get controls for validation
  get formControls() { return this.loginForm.controls; }

  //Login Verification
  loginCredentials() {
    this.isSubmitted = true;
    console.log("Submitted form for credentials");


    if (this.loginForm.valid) {
      console.log("Submitted Form is valid");
      
      this.authService.loginVerify(this.loginForm.value).subscribe(
        data => {
          this.error='';
          console.log(data);
          this.loginUser = data;

          //Username, Role and Token
          sessionStorage.setItem('JwtTOKEN', this.loginUser.token);


          //Check the role based and redirects to respective pages
          if (this.loginUser.Role == "Administrator") {
            console.log("Redirecting to Admin Page");
            localStorage.setItem("USERNAME", this.loginUser.UserName);
            localStorage.setItem("ACCESSROLE", this.loginUser.Role);
            sessionStorage.setItem("USERNAME", this.loginUser.UserName);
            this.router.navigateByUrl('/admin');
          }
          else if (this.loginUser.RoleName == "Manager") { 
            console.log("Redirecting to Manager Page");
            localStorage.setItem("USERNAME", this.loginUser.UserName);
            localStorage.setItem("ACCESSROLE", this.loginUser.RoleName);
            sessionStorage.setItem("USERNAME", this.loginUser.UserName);
            this.router.navigateByUrl('/manager');
          }
          else if (this.loginUser.RoleName == "Coordinator") { 
            console.log("Redirecting to Coordinator Page");
            localStorage.setItem("USERNAME", this.loginUser.UserName);
            localStorage.setItem("ACCESSROLE", this.loginUser.RoleName);
            sessionStorage.setItem("USERNAME", this.loginUser.UserName);
            this.router.navigateByUrl('/coordinator');
          }
          else {
            this.error = "Sorry! You are not authorized to access this page.";
           }
        },
        error => { 
          this.error = "Invalid username or password! try again...";
          console.log(error);
        }
      );
}else console.log("Form is invalid");
   }
}
