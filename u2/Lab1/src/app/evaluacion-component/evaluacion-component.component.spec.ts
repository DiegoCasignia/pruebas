import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluacionComponent } from './evaluacion-component.component';
import { By } from '@angular/platform-browser';

describe('EvaluacionComponent', () => {
  let component: EvaluacionComponent;
  let fixture: ComponentFixture<EvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. Prueba con .toEqual: nombre debe ser "Su Nombre"
  it('debe tener el valor "Su Nombre" en el campo nombre', () => {
    component.nombre = 'Su Nombre';
    fixture.detectChanges();
    expect(component.nombre).toEqual('Su Nombre');
  });

  // 2. Prueba con .toBeLessThan: nota1 < nota2
  it('debe verificar que nota1 sea menor que nota2', () => {
    component.nota1 = 7;
    component.nota2 = 9;
    fixture.detectChanges();
    expect(component.nota1).toBeLessThan(component.nota2);
  });

  // 3. Prueba con .toMatch: comentarios contiene texto exacto
  it('debe contener la frase exacta en comentarios', () => {
    component.comentarios = 'Universidad de las Fuerzas Armadas ESPE';
    fixture.detectChanges();
    expect(component.comentarios).toMatch(/Universidad de las Fuerzas Armadas ESPE/);
  });

  // 4. Prueba con .toBeTruthy: dado() retorna true si número aleatorio es par
  it('debe retornar true si el número aleatorio es par', () => {
    // Mockear Math.random para que siempre retorne 0.5 (número 4)
    spyOn(Math, 'random').and.returnValue(0.5);
    const resultado = component.dado(); // 4 => par
    expect(resultado).toBeTruthy();
  });

  // 5. Prueba con .toContain: el h1 contiene el texto esperado
  it('debe contener el texto "Evaluación Segundo Parcial" en el h1', () => {
    const h1 = fixture.debugElement.query(By.css('#titulo')).nativeElement;
    expect(h1.textContent).toContain('Evaluación Segundo Parcial');
  });
});
