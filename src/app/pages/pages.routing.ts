import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { Usuario } from '../models/usuario.model';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
            { path: 'articulos', component: ArticulosComponent,data:{titulo:'Articulos'} },
            { path: 'proyectos', component: ProyectosComponent ,data:{titulo:'Proyectos'} },
            { path: 'graficas', component: Grafica1Component ,data:{titulo:'Graficas'} },
            { path: 'account-settings', component: AccountSettingsComponent,data:{titulo:'Configuracion de cuenta'} },
            { path: 'perfil', component: PerfilComponent,data:{titulo:'Perfil'} },
            //Mantenimientos de usuario
            {path:'usuarios', component:UsuariosComponent,data:{titulo:'Usuarios de la aplicacion'}}     
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
