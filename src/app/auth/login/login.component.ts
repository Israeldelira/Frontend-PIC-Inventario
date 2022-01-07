import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


public formSubmitted=false
  public loginForm = this.fb.group({

    user: [localStorage.getItem('user')|| '', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

     campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }
  login() {
    this.formSubmitted = true;
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;

    }
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp=>{
     if(this.loginForm.get('remember')!.value){
       localStorage.setItem('user',this.loginForm.get('user')!.value);
       this.router.navigateByUrl('/');
     }else{
       localStorage.removeItem('user');
       this.router.navigateByUrl('/');
     }
    },
      (err)=>{
        Swal.fire({
          title: 'Error',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'

      });
    // this.router.navigateByUrl('/');
    // console.log(this.loginForm.value)
    });
}
}
