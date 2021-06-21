import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiredComponent } from './mired.component';

describe('MiredComponent', () => {
  let component: MiredComponent;
  let fixture: ComponentFixture<MiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
