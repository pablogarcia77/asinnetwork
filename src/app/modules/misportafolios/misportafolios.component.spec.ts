import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisportafoliosComponent } from './misportafolios.component';

describe('MisportafoliosComponent', () => {
  let component: MisportafoliosComponent;
  let fixture: ComponentFixture<MisportafoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisportafoliosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisportafoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
