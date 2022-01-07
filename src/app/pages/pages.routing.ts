import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        canLoad:[AuthGuard],
        loadChildren:()=>import('./child-routes.module').then(m=>m.ChildRoutesModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        FormsModule,CommonModule,
        BrowserModule],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
