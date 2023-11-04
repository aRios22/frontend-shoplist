import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    clave : new FormControl('', Validators.required),
  })

  constructor(public userService: UserServiceService, public router: Router) {}

  onSubmit() {
    

    if(this.loginForm.invalid){
      return;
    }
    this.userService.login(this.loginForm.value).subscribe((response) => {
      this.userService.setUsername(response['usuario']);
      console.log("Login exitoso")
      this.router.navigate(['main-page']);
    }
    ,
      (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Su usuario o Contraseña son incorrectos',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      },);
  }
}
