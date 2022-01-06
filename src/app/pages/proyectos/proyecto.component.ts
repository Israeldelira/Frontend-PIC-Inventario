import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'aws-sdk';
import { Proyecto } from 'src/app/models/proyecto.models';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',

})
export class ProyectoComponent implements OnInit {

  public cargando: boolean = true;
  public proyectoForm!: FormGroup;
  public proyectos: Proyecto[] = [];
  public pagination: number = 0;
  public totalProyectos: number = 0;
  public proyectosForm!: FormGroup;
  public formSubmitted = false;
  public mostrar: boolean = true;
  public usuarios: Usuario[]
  
  proyecto = null;
  constructor(
    private proyectosServices:ProyectoService,
    private busquedaService:BusquedaService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarProyecto(id);
  })
  this.cargarUsuarios()

  this.proyectosForm = this.fb.group({
    name: ['', Validators.required],
    client: ['',Validators.required],
    manager: ['', Validators.required],
    complete: ['false'],

  })
} 

cargarUsuarios(){
    
  this.usuarioService.obtenerTodosUsuarios()
  .subscribe(resp=> {

    this.usuarios = resp.usuarios
    console.log("este es el resultado de us"+this.usuarios)
  
  }
     )
}

  cargarProyectos(){
    this.cargando=true;
    this.proyectosServices.cargarProyecto(this.pagination)
    .subscribe(({total,proyectos})=>{
    this.cargando=false;
     this.proyectos=proyectos
     this.totalProyectos=total
    })
  }

  registrarProyecto() {
    this.formSubmitted = true;
    console.log(this.proyectosForm.value);
    if (this.proyectosForm.invalid) {
      return;

    }
    const {name, client, manager,complete } = this.proyectosForm.value!
    this.proyectosServices.crearProyecto(this.proyectosForm.value)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire({

          icon: 'success',
          title: 'Registrado',
          text: `Se registro el proyecto: ${name} correctamente`,
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })
                this. proyectosForm.reset();
      }, (err) => {
        Swal.fire({
          title: 'Ocurrio un error',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        // Swal.fire('Error Ha ocurrido un problema',err.error.msg,'error',);
      });

  }

  cargarProyecto(id: string) {
    if (id == "nuevo") {
      this.mostrar = true
    } else {
      this.mostrar = false

      this.proyectosServices.obtenerProyecto(id).subscribe(resp => {
        this.proyecto = resp.proyecto
      })
    }
  }

  buscar(termino: string) {
console.log(termino)
    if (termino.length === 0) {

      return this.cargarProyectos();
    }
    this.busquedaService.buscar('providers', termino)
      .subscribe(resp => {


      });
  }

  campoNoValido(campo: string): boolean {
    if (this.proyectosForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }
  actualizarProyecto() {
    console.log(this.proyectosForm.value!)
     console.log(this.proyectosForm)
        const {name, client, manager,complete } = this.proyectosForm.value!
        const data = {
          ...this.proyectosForm.value!,
          _id: this.proyecto?.project._id
        }
        this.proyectosServices.actualizarProyecto(data)
          .subscribe(resp => {
            this.cargarProyecto(this.proyecto?.project._id)
            Swal.fire('Actualizado', `Proyecto: ${name} actualizado correctamente`, 'success');
            this. proyectosForm.reset();
          },(err)=>{
        console.log(err);
        Swal.fire({
          title: 'Ocurrio un error',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
      })
    }
}
