import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Provedor } from 'src/app/models/provedores.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProvedorService } from 'src/app/services/provedor.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
})
export class ArticuloComponent implements OnInit {
  public provedores: Provedor[];
  public imagenSubir!: File;
  public imgTemp: any = null;
  public articuloForm!: FormGroup;
  public categoriaSeleccionada: Categoria;
  public provedorSeleccionado: Provedor;
  formSubmitted: boolean;
  public categorias: any;
  public mostrar: boolean = true;
  responses$: Observable<any>;
  articulo = null;
  public imprimirQR: boolean = false;
  public urlImg: string = "http://192.168.3.22:3000/api/upload/articles/"

  fileName = '';



  constructor(private categoriaService: CategoriaService,
    private provedorService: ProvedorService,
    private articuloService: ArticuloService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarArticulo(id);
    })

    this.articuloForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      trademark: ['', Validators.required],
      category: ['', Validators.required],
      levelStock: ['', Validators.required],
      providerId: ['', Validators.required],
      quantity: ['', Validators.required],
      img: [null],
    })
    this.cargarProvedores()
    this.cargarCategorias()
  }
  cargarArticulo(id: string) {
    if (id == "nuevo") {
      this.mostrar = true
    } else {
      this.mostrar = false

      this.articuloService.obtenerArticulo(id).subscribe(resp => {
        this.articulo = resp.articulo
      })
    }
  }
  guardarArticulo() {
    const formData: any = new FormData
    this.formSubmitted = true;
    formData.append('name', this.articuloForm.get('name').value)
    formData.append('model', this.articuloForm.get('model').value)
    formData.append('trademark', this.articuloForm.get('trademark').value)
    formData.append('category', this.articuloForm.get('category').value)
    formData.append('levelStock', this.articuloForm.get('levelStock').value)
    formData.append('providerId', this.articuloForm.get('providerId').value)
    formData.append('quantity', this.articuloForm.get('quantity').value)
    formData.append('img', this.articuloForm.get('img').value)
    console.log(this.articuloForm.value);
    console.log("este es  form data" + formData)
    this.responses$ = this.articuloService.agregarArticulo(formData);
    this.responses$.subscribe(
      res => {
        if (res) {
          this.router.navigateByUrl('/dashboard/articulos');
          Swal.fire({

            icon: 'success',
            title: 'Registro correcto',
            text: 'El articulo se registro correctamente',
            confirmButtonColor: '#3085d6',
            timer: 3500,
            confirmButtonText: 'Ok'
          })
        }
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
  onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.articuloForm.patchValue({
      img: file
    });
    this.articuloForm.get('img').updateValueAndValidity();

    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   // just checking if it is an image, ignore if you want
    //   if (!file.type.startsWith('img')) {
    //     this.articuloForm.get(field).setErrors({
    //       required: true
    //     });
    //     this.cd.markForCheck();
    //   } else {
    //     // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
    //     this.articuloForm.patchValue({
    //       [field]: file
    //     });
    //     // need to run CD since file load runs outside of zone
    //     this.cd.markForCheck();
    //   }
    // }
  }
  cambiarImagen(event) {
    if (!event.target.files[0]) {
      this.imagenSubir = null;
      return this.imgTemp = null;
    } else {
      const file = event.target.files[0];
      this.imagenSubir = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }
  actualizarArticulo() {
    console.log(this.articuloForm.value!)

    const { name, model, trademark, category, providerId, levelStock, quantity } = this.articuloForm.value!
    const data = {
      ...this.articuloForm.value!,
      _id: this.articulo?.article._id,
      img: this.articulo?.article.img
    }
    this.articuloService.actualizarArticulo(data)
      .subscribe(resp => {
        this.cargarArticulo(this.articulo?.article._id)
        Swal.fire({

          icon: 'success',
          title: 'Actualizacion correcta',
          text: `${name} actualizado correctamente`,
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })


      }, (err) => {
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

  cargarProvedores() {

    this.provedorService.obtenerProvedores()
      .subscribe(provedores => {
        console.log("2" + provedores)
        this.provedores = provedores
        console.log(this.provedores)
      }
      )
  }
  cargarCategorias() {

    this.categoriaService.cargarAllCategorys()
      .subscribe(resp => {
        this.categorias = resp.categorias
      }
      )
  }
  changeProvedor(e) {
    this.articuloForm.get('provedorSeleccionado').setValue(e.target.value, {
      onlySelf: true
    })
  }
  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'articles', this.articulo?.article._id || '')

      .then(image => {
        this.articulo.img = image;
        Swal.fire({

          icon: 'success',
          title: 'Actualizacion correcta',
          text: `Imagen del articulo actualizada correctamente`,
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })
      }).catch(err => {

        Swal.fire({
          title: 'Error',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
      })

  }

  printer() {
this.imprimirQR=true;
    const printContent = document.getElementById("QR");

    window.print();

  }
}
