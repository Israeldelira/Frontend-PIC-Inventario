import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos/articulos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        children: [
            { path: 'articulos', component: ArticulosComponent },
            { path: 'proyectos', component: ProyectosComponent },
           
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
