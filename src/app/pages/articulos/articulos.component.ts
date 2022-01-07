import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { Articulo } from 'src/app/models/articulos.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  public articulos:Articulo[]=[];
  public cargando: boolean = true;
  public totalArticulos: number = 0;
  public pagination: number = 0;
  //IP CASA
  // public urlImg: string="http://192.168.1.88:3000/api/upload/articles/"
//IP TRABAJO
public urlImg: string="http://192.168.3.22:3000/api/upload/articles/"
  constructor(
    private articulosServices:ArticuloService,
    private busquedaService:BusquedaService,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
    this.cargarArticulos()
  }
  
  cargarArticulos(){
    this.cargando=true;
    this.articulosServices.cargarArticulos(this.pagination)
    .subscribe(({total,articulos})=>{
    this.cargando=false;
     this.articulos=articulos
     this.totalArticulos=total
     console.log(articulos);
    })
  }
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      
      return this.cargarArticulos();
    }
    this.busquedaService.buscar( 'articles', termino )
        .subscribe( resp => {
console.log(resp)
          this.articulos = resp;
        });
  }
  
  cambiarPagina(valor: number) {
    console.log("este es el valor" + valor)
    this.pagination += valor;
    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalArticulos) {
      this.pagination -= valor;
    }
    this.cargarArticulos();
  }
  eliminarArticulo(articulo:Articulo){
    if(this.usuarioService.roleUser==='ADMIN'){
    Swal.fire({
      title: '¿Deseas elimnar el articulo?',
      text: `Eliminar Articulo: ${articulo.name} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#C8CBCA',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.articulosServices.eliminarArticulo(articulo).subscribe(
          resp=>  {
            this.cargarArticulos();
            Swal.fire({
              title: 'Eliminado',
              text: `El articulo ${articulo.name} se elimino de manera correcta`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        )
      
      }
    })
  }else{
    Swal.fire({
      title: 'Alerta',
      text: `Ops... Parece que estas perdido, no estas autorizado`,
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Entendido',
      timer: 3500,
    })
    this.router.navigateByUrl('/dashboard')
  }
  }

}
