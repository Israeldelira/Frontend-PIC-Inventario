import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { getProvedor, Provedor } from 'src/app/models/provedores.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ProvedorService } from 'src/app/services/provedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provedor',
  templateUrl: './provedor.component.html',
  styles: [
  ]
})
export class ProvedorComponent implements OnInit {
  public cargando: boolean = true;
  public provedorForm!: FormGroup;
  public provedores: Provedor[] = [];
  public pagination: number = 0;
  public totalProvedores: number = 0;
  public provedoresForm!: FormGroup;
  public formSubmitted = false;
  // public provedor: Provedor[] = [];
  public mostrar: boolean = true;
  proveedor = null;

  constructor(
    private provedoresService: ProvedorService,
    private busquedaService: BusquedaService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.params
    // .pipe(
    //   switchMap( ({ id }) => this.provedoresService.obtenerProvedor(id) )
    // )
    // .subscribe( provider => {this.provedor = provider 
    // console.log(this.provedor)
    //   console.log(provider)});
    // this.activatedRoute.params
    // .pipe(
    //   switchMap( ({ id }) => this.provedoresService.obtenerProvedor( id )  ),
    //   tap( console.log )
    // )
    // .subscribe( provider => this.provedor = provider as Provedor[] );

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarProvedor(id);
    })

    this.provedoresForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['',
        Validators.required,
      ],
      address: ['', Validators.required],
    })
  }
  registrarProvedor() {
    this.formSubmitted = true;
    console.log(this.provedoresForm.value);
    if (this.provedoresForm.invalid) {
      return;

    }
    this.provedoresService.crearProvedor(this.provedoresForm.value)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire({

          icon: 'success',
          title: 'Registrado',
          text:'El provedor se registro de manera correcta',
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })
        this.router.navigateByUrl('/dashboard/provedores');
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
  buscar(termino: string) {

    if (termino.length === 0) {

      return this.cargarProvedores();
    }
    this.busquedaService.buscar('providers', termino)
      .subscribe(resp => {


      });
  }
  campoNoValido(campo: string): boolean {
    if (this.provedoresForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }
  cargarProvedores() {
    this.cargando = true;
    this.provedoresService.cargarProvedores(this.pagination)
      .subscribe(({ total, provedores }) => {
        this.cargando = false;
        this.provedores = provedores
        this.totalProvedores = total
      })
  }

  cargarProvedor(id: string) {
    if (id == "nuevo") {
      this.mostrar = true
    } else {
      this.mostrar = false

      this.provedoresService.obtenerProvedor(id).subscribe(resp => {
        this.proveedor = resp.provedor
      })
    }
  }
  actualizarProvedor() {
console.log(this.provedoresForm.value!)
 
    const {name, address, phone } = this.provedoresForm.value!
    const data = {
      ...this.provedoresForm.value!,
      _id: this.proveedor?.provider._id
    }
    this.provedoresService.actualizarProvedor(data)
      .subscribe(resp => {
        this.cargarProvedor(this.proveedor?.provider._id)
        Swal.fire('Actualizado', `${name} actualizado correctamente`, 'success');
        this. provedoresForm.reset();
      }
      ,(err)=>{
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
