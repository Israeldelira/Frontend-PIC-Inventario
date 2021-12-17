import { Component, OnInit } from '@angular/core';
import { Provedor } from 'src/app/models/provedores.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ProvedorService } from 'src/app/services/provedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styles: [
  ]
})
export class ProvedoresComponent implements OnInit {
  public provedores:Provedor[]=[];
  public provedoresTemp: Provedor[] = [];
  public cargando: boolean = true;
  public totalProvedores: number = 0;
  public pagination: number = 0;

  constructor(
    private provedoresServices:ProvedorService,
    private busquedaService:BusquedaService
    ) { }

    ngOnInit(): void {
      this.cargarProvedores();
    }
  cargarProvedores(){
    this.cargando=true;
    this.provedoresServices.cargarProvedores(this.pagination)
    .subscribe(({total,provedores})=>{
    this.cargando=false;
     this.provedores=provedores
     this.totalProvedores=total
    })
  }
  cambiarPagina(valor: number) {
    this.pagination += valor;
    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalProvedores) {
      this.pagination -= valor;
    }
    this.cargarProvedores();
  }
  buscar( termino: string ){

    if ( termino.length === 0 ) {
      
      return this.cargarProvedores();
    }
    this.busquedaService.buscar( 'providers', termino )
        .subscribe( resp => {

          this.provedores = resp;
        });
  }
  eliminarProvedor(provedor:Provedor){


    this.cargarProvedores();
    Swal.fire({
      title: '¿Deseas eliminar el provedor seleccionado?',
      text: `Eliminar el provedor: ${provedor.name} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#C8CBCA',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.provedoresServices.eliminarProvedor(provedor._id).subscribe(
          resp=>  {
            this.cargarProvedores();
            Swal.fire({
              title: 'Eliminado',
              text: `El provedor: ${provedor.name} se elimino de manera correcta`,
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

}
