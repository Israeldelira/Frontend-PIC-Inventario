import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]
    ],
    user: ['',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]
    ],
    password: ['',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]
    ],
    password2: ['',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]
    ],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;

    }
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        Swal.fire({
        
          icon: 'success',
          title: 'Usuario registrado',
          text: 'Inicia sesion',
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })
      this.router.navigateByUrl('/login');
      }, (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        // Swal.fire('Error Ha ocurrido un problema',err.error.msg,'error',);
      });
       
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }
  passwordsNoValidas() {
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }

  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }


    }
  }



}
