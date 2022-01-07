import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Articulo } from 'src/app/models/articulos.model';
import { Entradas } from 'src/app/models/entradas.model';
import { Proyecto } from 'src/app/models/proyecto.models';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})

export class EntradasComponent implements OnInit {
  public entradas:Entradas[]=[];
  public articulos: Articulo[];
  public cargando: boolean = false;
  public entradasTemp: Entradas[] = [];
  public totalEntradas: number = 0;
  public pagination: number = 0;
  public mostrarFormEntrada: boolean = false;
  public entradaForm!: FormGroup;
  public articuloSeleccionado= null
  public valor: boolean=false
  public error: boolean=false
  public formSubmitted = false;
  
  constructor(
    private almacenServices: AlmacenService,
    private busquedaServices:BusquedaService,
    private articulosServices: ArticuloService,
    private proyectosService: ProyectoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { 
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarArticulo(id);
    })
      this.entradaForm = this.fb.group({
        
        article: ['', [Validators.required]],
       
        quantity: ['', [Validators.required]],
    
      })
    this.cargarEntradas()
  }
  campoNoValido(campo: string): boolean {
    if (this.entradaForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }
  registrarEntrada() {
    this.formSubmitted = true;
    console.log(this.entradaForm.value);
    if (this.entradaForm.invalid) {
      return;

    }
    
    this.almacenServices.registrarEntrada(this.entradaForm.value)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire({

          icon: 'success',
          title: `Registro exitoso`,
          text:  'Material agregado al almacen de manera correcta',
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/dashboard/entradas/vacio'])
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
  cargarEntradas(){
   
    this.cargando=true;
    this.almacenServices.cargarEntradas(this.pagination)
    .subscribe(({total,entradas})=>{
   
    this.cargando=false;
     this.entradas=entradas
     this.totalEntradas=total
    })
    
  }
  cambiarPagina(valor: number) {
    this.pagination += valor;
    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalEntradas) {
      this.pagination -= valor;
    }
    this.cargarEntradas();
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
  buscar(termino: string) {

    if (termino.length === 0) {

      return this.cargarEntradas();
    }
    this.busquedaServices.buscar('inputs', termino)
      .subscribe(resp => {


      });
  }
 
  cargarArticulo(id: string) {
    console.log("valor id"+id)
      if (id === "vacio") {
        this.mostrarFormEntrada = false
        this.valor = false
        this.error = false
        this.cargarEntradas()
      } else if(id==="nueva"){
     
        this.valor = false
        this.error = false
        this.mostrarFormEntrada = true
          console.log("Entra el true")
         
          this.cargarArticulos()
      }
      else{
        this.valor =true
        this.mostrarFormEntrada = true
        this.articulosServices.obtenerArticulo(id).subscribe(resp => {
          this.articuloSeleccionado = resp.articulo
          this.entradaForm = this.fb.group({
            article: [this.articuloSeleccionado.article._id],
            quantity: ['', Validators.required],
          })
        },
        (err)=>{
          this.valor =false
          this.mostrarFormEntrada = false
          this.error =true
          Swal.fire({
            title: 'Error',
            text: 'No hay ningun id valido',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
          this.router.navigate(['/dashboard/entradas/vacio'])
          
          this.cargarEntradas();
          console.log('Error al extraer el id')
        })
         
          // this.bajaForm = this.fb.group({
          //   article: [this.articuloSeleccionado?.article._id],
          //   description: ['', Validators.required],
          //   quantity: ['', Validators.required],
          //   project: ['', Validators.required],
          // })
       
      }
    }

  formattedDate(date) {
    return moment(date).format("DD/MM/YYYY HH:mm")
}
}
