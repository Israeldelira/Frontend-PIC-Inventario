import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Articulo } from 'src/app/models/articulos.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Provedor } from 'src/app/models/provedores.model';
import { Proyecto } from 'src/app/models/proyecto.models';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[]=[]
  public articulos:Articulo[]=[]
  public proyectos:Proyecto[]=[]
  public categorias:Categoria[]=[]
  public provedores:Provedor[]=[]
  constructor(
    private activateRoute:ActivatedRoute,
    private busquedaService: BusquedaService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({termino})=>{
      this.busquedaGeneral(termino)
    })
  }

  busquedaGeneral(termino:string){
    this.busquedaService.busquedaGeneral(termino)
    .subscribe((resp:any) =>{
      this.usuarios=resp.searchUser;
      this.articulos=resp.searchArticle;
      this.provedores=resp.searchProvider
      this.categorias=resp.searchCategory
      this.proyectos=resp.searchProject
      console.log(resp)
    })

  }
  formattedDate(date) {
    return moment(date).format("DD/MM/YYYY")
}

}
