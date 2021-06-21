import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirmeComponent } from './unirme.component';

describe('UnirmeComponent', () => {
  let component: UnirmeComponent;
  let fixture: ComponentFixture<UnirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnirmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
