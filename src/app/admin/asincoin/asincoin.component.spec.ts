import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsincoinComponent } from './asincoin.component';

describe('AsincoinComponent', () => {
  let component: AsincoinComponent;
  let fixture: ComponentFixture<AsincoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsincoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsincoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
