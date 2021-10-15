import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRangosComponent } from './gestion-rangos.component';

describe('GestionRangosComponent', () => {
  let component: GestionRangosComponent;
  let fixture: ComponentFixture<GestionRangosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRangosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
