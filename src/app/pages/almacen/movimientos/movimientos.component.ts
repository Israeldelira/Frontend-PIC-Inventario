import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/models/articulos.model';
import { Proyecto } from 'src/app/models/proyecto.models';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  public proyectos: Proyecto[];
  public articulos: Articulo[];
  public cargando: boolean = true;
  public mostrar: boolean = true;
  public bajaForm!: FormGroup;
  articulo = null;

  constructor(
  
   private articulosServices: ArticuloService,
   private proyectosService: ProyectoService,
   private fb: FormBuilder,
   private activatedRoute: ActivatedRoute,
   private router:Router,
   private articuloService:ArticuloService,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ movimiento }) => {
      this.mostrarAccion(movimiento);})

    this.bajaForm = this.fb.group({
      article: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      project: ['', Validators.required],
    })

    this.cargarProyectos()
    this.cargarArticulos()
  }

  mostrarAccion(id: string) {
    if (id == "vacio") {
      this.mostrar = true
    } else {
      this.mostrar = false

      this.articuloService.obtenerArticulo(id).subscribe(resp => {
        this.articulo = resp.articulo
    
      })
    }
  }

  cargarProyectos(){
    this.proyectosService.obtenerProyectoss()
    .subscribe(proyectos=> {
   console.log("2"+proyectos)
      this.proyectos = proyectos
      console.log(this.proyectos)
    }
       )
  }
  cargarArticulos(){
    this.articulosServices.cargarTodosArticulos()
    .subscribe(articulos=> {
   console.log("2"+articulos)
      this.articulos = articulos
      console.log(this.articulos)
    }
       )
  }

}
