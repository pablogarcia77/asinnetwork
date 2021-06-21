import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPortafoliosComponent } from './gestion-portafolios.component';

describe('GestionPortafoliosComponent', () => {
  let component: GestionPortafoliosComponent;
  let fixture: ComponentFixture<GestionPortafoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPortafoliosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPortafoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
