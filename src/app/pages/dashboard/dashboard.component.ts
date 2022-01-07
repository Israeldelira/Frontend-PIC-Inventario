import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulos.model';
import { Proyecto } from 'src/app/models/proyecto.models';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public totalCompletos: number = 0;
  public proyectosCompletos:Proyecto[]=[];
  public proyectosIncompletos:Proyecto[]=[];
  public totalIncompletos: number = 0;
  public articulosBajo:Articulo[]=[]
  public articulosAlto:Articulo[]=[]
  public totalLow: number=0;
  public totalStock: number=0;
  public totalHigh: number=0;
  totalUsuarios: number;
  public pagination: number = 0;
  
  public urlImg: string="http://192.168.3.22:3000/api/upload/articles/"

  constructor(
    private dashboardProyectosService:ProyectoService,
    private usuarioService:UsuarioService,
    private articulosService:ArticuloService
  ) { }

  cambiarPaginaBajo(valor: number) {
    console.log("este es el valor" + valor)
    this.pagination += valor;
    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalLow) {
      this.pagination -= valor;
    }
    this.dashboardStock();
  }
  cambiarPaginaAlto(valor: number) {
    console.log("este es el valor" + valor)
    this.pagination += valor;
    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalHigh) {
      this.pagination -= valor;
    }
    this.dashboardStock();
  }
  ngOnInit(): void {
    this.dashboardProyectos();
    this.cargarUsuarios();
   this.dashboardStock()
  }
  dashboardProyectos(){
   
    
    this.dashboardProyectosService.dashboardProyecto()
    .subscribe((
      {totalCompletos,
      totalIncompletos,
      proyectosCompletos,
      proyectosIncompletos })=>{
console.log("si jala "+totalCompletos)
     this.proyectosCompletos= proyectosCompletos
     this.proyectosIncompletos=proyectosIncompletos
     this.totalIncompletos=totalIncompletos
     this.totalCompletos=totalCompletos
    })
    
  }
  dashboardStock(){
    this.articulosService.cargarDashboardStock(this.pagination)
    .subscribe(({articulosHigh,articulosLow,totalHigh,totalLow}) => {
      console.log(this.articulosAlto)
      this.articulosAlto = articulosHigh
      this.articulosBajo= articulosLow
      this.totalHigh =totalHigh
      this.totalLow =totalLow
      this.totalStock=totalHigh+totalLow;

    }
       )
  }
  cargarUsuarios() {
    this.usuarioService.cargarUsuarios()
      .subscribe(({ total }) => {
        this.totalUsuarios = total;
      })
  }
}
