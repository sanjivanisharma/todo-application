import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private api: UserService, private toastr: ToastrService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const token = btoa(this.loginForm.controls.username.value + ":" + this.loginForm.controls.password.value)
      this.api.login(token).subscribe({
        next: (res: any) => {
          if(res.username && res.password) {
            localStorage.setItem('User', token)
            this.toastr.success("Successfully Logged In")
            this.loginForm.reset()
            this.router.navigateByUrl('/todo')
          } else {
            this.toastr.success("Invalid username or password")
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}
