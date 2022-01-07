import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SlidebarService } from 'src/app/services/slidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
// menuItems:any[];
// public imgUrl ='';
public usuario!:Usuario;

  constructor(
    public sidebarService: SlidebarService,
    private  usuarioService:UsuarioService) { 
    // this.menuItems=slidebarService.menu;
    // this.imgUrl= usuarioService.usuario.imgUrl
    this.usuario=usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
