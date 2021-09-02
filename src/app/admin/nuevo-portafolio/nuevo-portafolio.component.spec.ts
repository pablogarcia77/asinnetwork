import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPortafolioComponent } from './nuevo-portafolio.component';

describe('NuevoPortafolioComponent', () => {
  let component: NuevoPortafolioComponent;
  let fixture: ComponentFixture<NuevoPortafolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoPortafolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
