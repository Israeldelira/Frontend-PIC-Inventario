import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SlidebarService } from '../services/slidebar.service';
declare function customInitFunctions():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor(
    private settingsService: SettingsService,
    private sidebarService: SlidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }


}
