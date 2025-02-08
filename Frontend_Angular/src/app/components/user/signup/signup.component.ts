import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup

  constructor(private api: UserService, private toastr: ToastrService, private router: Router) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.signupForm.valid) {
      const token = btoa(this.signupForm.controls.username.value + ":" + this.signupForm.controls.password.value)
      const body = {email: this.signupForm.controls.email.value}
      this.api.signup(body, token).subscribe({
        next: (res: any) => {
          if(res.message === "User already exists") {
            this.toastr.success("User already exists")
          } else if(res.message === "User with the provided email already exists") {
            this.toastr.success("Email already exists")
          } else if(res.message === "User Created successfully") {
            this.toastr.success("User successfully Signed Up")
            this.signupForm.reset()
            this.router.navigateByUrl('/login')
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}
