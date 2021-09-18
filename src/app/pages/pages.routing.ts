import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        children: [
            {path:'',component:DashboardComponent},
            { path: 'articulos', component: ArticulosComponent },
            { path: 'proyectos', component: ProyectosComponent },
            { path: 'graficas', component: Grafica1Component},
            { path: 'account-settings', component: AccountSettingsComponent},


           
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
