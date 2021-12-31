import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsincashComponent } from './asincash.component';

describe('AsincashComponent', () => {
  let component: AsincashComponent;
  let fixture: ComponentFixture<AsincashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsincashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsincashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
