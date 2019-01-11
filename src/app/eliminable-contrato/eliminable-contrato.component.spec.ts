import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminableContratoComponent } from './eliminable-contrato.component';

describe('EliminableContratoComponent', () => {
  let component: EliminableContratoComponent;
  let fixture: ComponentFixture<EliminableContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminableContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminableContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
