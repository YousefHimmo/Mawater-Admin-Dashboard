import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {environment} from '../../../environments/environment.development'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule ],
  standalone: true,
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  isLoggedIn = false;
  ngOnInit() {}

  onSubmit() {
    debugger
    if (this.loginForm.valid) {
      this.isLoggedIn = true;
      const formValue = this.loginForm.value;
      if(formValue){
         const email = formValue.email as string;
         const password = formValue.password as string;
        this.authService.loginV2(email,password)
        .subscribe({
          next : (res) =>{
            localStorage.setItem('isLoggedIn', "1");
            this.router.navigateByUrl(`/dashboard/home`);
          },
          error : (err)=>{
            this.isLoggedIn = false;
          }
        });
       
      }
    }
  }


}
