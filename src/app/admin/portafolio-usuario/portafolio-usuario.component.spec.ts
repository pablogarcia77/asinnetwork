import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioUsuarioComponent } from './portafolio-usuario.component';

describe('PortafolioUsuarioComponent', () => {
  let component: PortafolioUsuarioComponent;
  let fixture: ComponentFixture<PortafolioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortafolioUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortafolioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
