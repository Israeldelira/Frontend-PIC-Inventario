import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Articulo } from 'src/app/models/articulos.model';
import { Bajas } from 'src/app/models/bajas.model';
import { Proyecto } from 'src/app/models/proyecto.models';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
  public bajas:Bajas[]=[];
  public proyectos: Proyecto[];
  public articulos: Articulo[];
  public bajasTemp: Bajas[] = [];
  public cargando: boolean=true;
  public totalBajas: number = 0;
  public pagination: number = 0;
  public mostrarFormBaja: boolean = false;
  public bajaForm!: FormGroup;
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
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarArticulo(id);
    })
      this.bajaForm = this.fb.group({
        article: ['', Validators.required],
        description: ['', Validators.required],
        quantity: ['', Validators.required],
        project: ['', Validators.required],
      })
    this.cargarBajas()
  
   
  }
cargarArticulo(id: string) {
  console.log("valor id"+id)
    if (id === "vacio") {
      this.mostrarFormBaja = false
      this.valor = false
      this.error = false
      this.cargarBajas()
    } else if(id==="nueva"){
   
      this.valor = false
      this.error = false
      this.mostrarFormBaja = true
        console.log("Entra el true")
        this.cargarProyectos()
        this.cargarArticulos()
    }
    else{
      this.cargarProyectos()

    
      this.valor =true
      this.mostrarFormBaja = true
      this.articulosServices.obtenerArticulo(id).subscribe(resp => {
        this.articuloSeleccionado = resp.articulo
        this.bajaForm = this.fb.group({
          article: [this.articuloSeleccionado.article._id],
          description: ['', Validators.required],
          quantity: ['', Validators.required],
          project: ['', Validators.required],
        })
      },
      (err)=>{
        this.valor =false
        this.mostrarFormBaja = false
        this.error =true
        Swal.fire({
          title: 'Error',
          text: 'No existe un id valido',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/dashboard/salidas/vacio'])
        
        this.cargarBajas();
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
  cargarBajas(){
   
    this.cargando=true;
    this.almacenServices.cargarBajas(this.pagination)
    .subscribe(({total,bajas})=>{
      console.log("si estan entrando las bajas")
    this.cargando=false;
     this.bajas=bajas
     this.totalBajas=total
    })
    
  }
  cambiarPagina(valor: number) {
    this.pagination += valor;
    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalBajas) {
      this.pagination -= valor;
    }
    this.cargarBajas();
  }
  // mostrarAccion() {
  //     this.mostrarFormBaja = true
  //     this.cargarProyectos()
  //     this.cargarArticulos()
  // }
  ocultarAccion() {
    this.mostrarFormBaja = false
  
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

  registrarBaja() {
    this.formSubmitted = true;
    console.log(this.bajaForm.value);
    if (this.bajaForm.invalid) {
      return;

    }
    this.almacenServices.registrarBaja(this.bajaForm.value)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire({

          icon: 'success',
          title: 'Registro exitoso',
          text:'Salida de material agregada correctamente',
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/dashboard/salidas/vacio'])
        this.bajaForm.reset();
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
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      
      return this.cargarBajas();
    }
    this.busquedaServices.buscar( 'bajas', termino )
        .subscribe( resp => {
console.log(resp)
          this.bajas = resp;
        });
  }

  formattedDate(date) {
    return moment(date).format("DD/MM/YYYY HH:mm")
}
}
