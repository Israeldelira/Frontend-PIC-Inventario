import { Injectable,  EventEmitter} from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo!: 'users' | 'articles';
  public id!: string;
  public img?: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }
  abrirModal(
    tipo: 'users' | 'articles',
    id: string,
    img: string ='no-image-user.png'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = `${base_url}/upload/${tipo}/${img}`
   
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() { }
}
