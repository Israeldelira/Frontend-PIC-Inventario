import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { arch } from 'os';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

public perfilForm!:FormGroup;
// public imagenUpload:File | any;
public usuario!: Usuario
// public imgTemp?: string | ArrayBuffer |any;
  public imagenSubir!: File;
  public imgTemp: any = null;
  constructor(private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private fileUploadService:FileUploadService) { 
      this.usuario=usuarioService.usuario;
    }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
      nombre:['',
      [Validators.required,
        Validators.maxLength(50)
      ]],
      user:['',
      [Validators.required,
        Validators.maxLength(20)
      ]]
    })
  }

  // seleccionImg(archivo:File){
  //   if(!archivo){
  //     this.imagenUpload=null;
  //     return;
     
  //   }
  //   if(archivo.type.indexOf('image')<0){
  //     this.imagenUpload=null;
  //     alert('El archivo no es una imagen');
  //     return ;
  //   }
  //   this.imagenUpload=archivo;
  //   let readder=new FileReader();
  //   let urlImgTemp = readder.readAsDataURL(archivo);
  //   readder.onload=()=>this.imgTemp=readder.result
  // }
  // cambiarImagen(evt:any):any {
 
  //   if(evt?.target?.files[0]){
 
  //     this.imagenSubir = evt?.target?.files[0];
  
  //     if (!evt) {
  //       return this.imgTemp = null;
  //     }
  
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.imagenSubir);
  
  //     reader.onloadend = () => {
  //       this.imgTemp = reader.result;
  //     }
  //   }
  // }
  actualizarPerfil(){
    console.log(this.perfilForm.value)
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
    .subscribe(resp=>{
      const{nombre,user}=this.perfilForm.value;
      this.usuario.nombre=nombre
      this.usuario.user=user;
      this.perfilForm.reset();
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Se actualizaron los datos de manera correcta',
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
  cambiarImagen(event){
    if(!event.target.files[0]){
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
  // cambiarImagen(evt:any):any {

  //   if(evt?.target?.files[0]){
  //     this.imagenSubir = evt?.target?.files[0];
  
  //     if (!evt) {
  //       return this.imgTemp = null;
  //     }
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.imagenSubir);
  
  //     reader.onloadend = () => {
  //       this.imgTemp = reader.result;
  //     }
  //   }
  // }
 
  subirImagen() {
 
    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'users', this.usuario._id || '' )
      .then( image => {
        this.usuario.img = image;
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Se actualizo la foto de manera correcta',
          confirmButtonColor: '#3085d6',
          timer: 3500,
          confirmButtonText: 'Ok'
        })
      }).catch( error => {
        console.log("no muestra ningun error"+error);
     
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
 
  }
  // subirImagen(){
  //   this.fileUploadService.actualizarFoto(this.imagenUpload,'users',this.usuario._id)
  //   .then(img=>console.log(img));
  // }

}
