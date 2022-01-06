import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoBajasComponent } from './proyecto-bajas.component';

describe('ProyectoBajasComponent', () => {
  let component: ProyectoBajasComponent;
  let fixture: ComponentFixture<ProyectoBajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoBajasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoBajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
