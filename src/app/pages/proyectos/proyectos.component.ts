import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.models';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectos:Proyecto[]=[];
  public proyectosTemp: Proyecto[] = [];
  public cargando: boolean = true;
  public totalProyectos: number = 0;
  public pagination: number = 0;
  constructor(
    private proyectosServices:ProyectoService,
    private busquedaService:BusquedaService
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }
cargarProyectos(){
  this.cargando=true;
  this.proyectosServices.cargarProyecto(this.pagination)
  .subscribe(({total,proyectos})=>{
  this.cargando=false;
   this.proyectos=proyectos
   this.proyectosTemp = proyectos;
   this.totalProyectos=total
   console.log(proyectos)
  })
}
cambiarPagina(valor: number) {
  this.pagination += valor;
  if (this.pagination < 0) {
    this.pagination = 0;
  } else if (this.pagination >= this.totalProyectos) {
    this.pagination -= valor;
  }
  this.cargarProyectos();
}
eliminarProyecto(proyecto:Proyecto){


  this.cargarProyectos();
  Swal.fire({
    title: '¿Eliminar proyecto',
    text: `¿Estas seguro de eliminar el proyecto: ${proyecto.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#C8CBCA',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      this.proyectosServices.eliminarProyecto(proyecto._id).subscribe(
        resp=>  {
          this.cargarProyectos();
          Swal.fire({
            title: 'Eliminado',
            text: `El proyecto: ${proyecto.name} se elimino de manera correcta`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        }
      )
    
    }
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

completarProyecto(proyecto:Proyecto){


  this.cargarProyectos();
  Swal.fire({
    title: 'Finalizar proyecto',
    text: `¿Confirma la finalizacion de el proyecto: ${proyecto.name}  `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#C8CBCA',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
const data={
  _id:proyecto._id,
  name:proyecto.name,
  client:proyecto.client,
  manager:proyecto.manager,
  registerUser:proyecto.registerUser,
  outputs:proyecto.outputs,
  status:proyecto.status,
  complete:true
}

      this.proyectosServices.completarProyecto(data).subscribe(
        resp=>  {
          this.cargarProyectos();
          Swal.fire({
            title: 'Se ha completado el proyecto',
            text: `El proyecto: ${proyecto.name} se ha concluido de manera correcta`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        },(err)=>{
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        })
      
    
    }
})}
// // ,(err)=>{
// //   console.log(err);
// //   Swal.fire({
// //     title: 'Ocurrio un error',
// //     text: err.error.msg,
// //     icon: 'error',
// //     confirmButtonColor: '#3085d6',
// //     confirmButtonText: 'Ok'
// //   })
// // })
// }
buscar(termino: string) {

  if (termino.length === 0) {

    return  this.proyectos = this.proyectosTemp;
  }
  this.busquedaService.buscar('projects', termino)
    .subscribe(resp => {
      this.proyectos = resp;

    });
}
}
