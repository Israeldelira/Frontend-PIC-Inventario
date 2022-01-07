import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Categoria } from 'src/app/models/categoria.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent implements OnInit {
public categorias:Categoria[]=[];
public categoriasTemp: Categoria[] = [];
public cargando: boolean = true;
public totalCategorias: number = 0;
public pagination: number = 0;
  constructor(private categoriaService: CategoriaService,
    private busquedaService:BusquedaService) { }

  ngOnInit(): void {
  this.cargarCategorias();
   
  }

cargarCategorias(){
  this.cargando=true;
  this.categoriaService.cargarCategoria(this.pagination)
  .subscribe(({total,categorias})=>{
  this.cargando=false;
   this.categorias=categorias
   this.categoriasTemp=categorias
   this.totalCategorias=total
  })
}
cambiarPagina(valor: number) {
  this.pagination += valor;
  if (this.pagination < 0) {
    this.pagination = 0;
  } else if (this.pagination >= this.totalCategorias) {
    this.pagination -= valor;
  }
  this.cargarCategorias();
}

guardarCambios(categoria:Categoria){
  this.categoriaService.actualizarCategoria(categoria._id, categoria.name)
  .subscribe(resp=>{
    Swal.fire({
      title: 'Actualizado',
      text: `La categoria se actualizo a ${categoria.name}`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
    this.cargarCategorias();
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
eliminarCategoria(categoria:Categoria){


  this.cargarCategorias();
  Swal.fire({
    title: '¿Deseas eliminar la categoria seleccionada?',
    text: `Eliminar categoria: ${categoria.name} `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#C8CBCA',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      this.categoriaService.eliminarCategoria(categoria._id).subscribe(
        resp=>  {
          this.cargarCategorias();
          Swal.fire({
            title: 'Eliminado',
            text: `La categoria: ${categoria.name} se elimino de manera correcta`,
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
 async abrirModalSA(){
  const {value=''} = await Swal.fire<string >({
    input: 'text',
    title:'Registrar nueva categoria',
    text:'Ingresa la categoria',
    confirmButtonColor: '#2488E8',
    cancelButtonColor: '#CE2804',
    inputPlaceholder: 'Categoria',
    showCancelButton: true,
    
  })
 
  if(value.trim().length > 0){
    console.log("valor"+value)
    this.categoriaService.crearCategoria(value)
    .subscribe(resp=>{

      this.cargarCategorias();
      Swal.fire({
        
        icon: 'success',
        title: 'Registrado',
        text: 'La categoria se registro correctamente ',
        confirmButtonColor: '#3085d6',
        timer: 3500,
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
    // dismiss can be 'cancel', 'overlay', 'close', 'timer'
    
  // if(value == ""){
  //   Swal.fire({
  //     title: 'Ocurrio un error',
  //     text: 'No se ingreso ninguna categoria',
  //     icon: 'error',
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: 'Ok',
  //     timer: 5500,
  //   })
  //  }
}
formattedDate(date) {
  return moment(date).format("DD/MM/YYYY HH:mm")
}
buscar( termino: string ) {

  if ( termino.length === 0 ) {
    return this.cargarCategorias();
  }
  this.busquedaService.buscar( 'categorys', termino )
      .subscribe( resp => {

        this.categorias = resp;

      });
}
}
