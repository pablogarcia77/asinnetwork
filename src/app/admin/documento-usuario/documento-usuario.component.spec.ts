import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoUsuarioComponent } from './documento-usuario.component';

describe('DocumentoUsuarioComponent', () => {
  let component: DocumentoUsuarioComponent;
  let fixture: ComponentFixture<DocumentoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
