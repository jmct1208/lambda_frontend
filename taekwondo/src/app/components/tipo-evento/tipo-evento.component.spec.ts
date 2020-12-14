import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEventoComponent } from './tipo-evento.component';

describe('TipoEventoComponent', () => {
  let component: TipoEventoComponent;
  let fixture: ComponentFixture<TipoEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
