import { Component, OnInit } from '@angular/core';
import { SlidebarService } from 'src/app/services/slidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
menuItems:any[];

  constructor(private slidebarService: SlidebarService) { 
    this.menuItems=slidebarService.menu;
    
  }

  ngOnInit(): void {
  }

}
