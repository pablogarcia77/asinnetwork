import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGananciasComponent } from './editar-ganancias.component';

describe('EditarGananciasComponent', () => {
  let component: EditarGananciasComponent;
  let fixture: ComponentFixture<EditarGananciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGananciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGananciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
