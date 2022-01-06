import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Proyecto } from '../../models/proyecto.models';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-proyecto-bajas',
  templateUrl: './proyecto-bajas.component.html',
  styleUrls: ['./proyecto-bajas.component.css']
})
export class ProyectoBajasComponent implements OnInit {
  public cargando: boolean = true;
  public proyectos: Proyecto[] = [];
  public mostrar: boolean = true;
  proyecto = null;
  
  constructor(
    private proyectosServices:ProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarProyecto(id);
  })
}
cargarProyecto(id: string) {
  

    this.proyectosServices.obtenerProyecto(id).subscribe(resp => {
      this.proyecto = resp.proyecto
    })
  }

  formattedDate(date) {
    return moment(date).format("DD/MM/YYYY HH:mm")
}
}

