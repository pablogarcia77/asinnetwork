import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRangosComponent } from './editar-rangos.component';

describe('EditarRangosComponent', () => {
  let component: EditarRangosComponent;
  let fixture: ComponentFixture<EditarRangosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRangosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
