import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisgananciasComponent } from './misganancias.component';

describe('MisgananciasComponent', () => {
  let component: MisgananciasComponent;
  let fixture: ComponentFixture<MisgananciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisgananciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisgananciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
