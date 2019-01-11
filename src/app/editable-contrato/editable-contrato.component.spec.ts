import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableContratoComponent } from './editable-contrato.component';

describe('EditableContratoComponent', () => {
  let component: EditableContratoComponent;
  let fixture: ComponentFixture<EditableContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
