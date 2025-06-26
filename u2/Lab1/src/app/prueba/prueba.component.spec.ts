import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PruebaComponent } from './prueba.component';

describe('PruebaComponent', () => {
  let component: PruebaComponent;
  let fixture: ComponentFixture<PruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. Verificar que el título se renderiza correctamente
  it('debe mostrar el título en el h1', () => {
    const titulo = fixture.debugElement.query(By.css('#titulo')).nativeElement;
    expect(titulo.textContent).toContain('Bienvenido al componente de prueba');
  });

  // 2. Verificar que el input existe en el DOM
  it('debe existir el input con id inputNombre', () => {
    const input = fixture.debugElement.query(By.css('#inputNombre'));
    expect(input).toBeTruthy();
  });

  // 3. Verificar que ngModel actualiza la propiedad "nombre"
  it('debe actualizar la propiedad nombre al escribir en el input', () => {
    const input = fixture.debugElement.query(By.css('#inputNombre')).nativeElement;
    input.value = 'Diego';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.nombre).toBe('Diego');
  });

  // 4. Verificar que al hacer clic en el botón se ejecuta el método saludar
  it('debe ejecutar el método saludar al hacer clic en el botón', () => {
    component.nombre = 'Diego';
    const boton = fixture.debugElement.query(By.css('#btnSaludar')).nativeElement;
    boton.click();
    fixture.detectChanges();
    expect(component.mensaje).toBe('Hola, Diego');
  });

  // 5. Verificar que el mensaje se muestre en el elemento <p>
  it('debe mostrar el mensaje en el <p>', () => {
    component.nombre = 'Diego';
    component.saludar();
    fixture.detectChanges();
    const mensaje = fixture.debugElement.query(By.css('#mensaje')).nativeElement;
    expect(mensaje.textContent).toBe('Hola, Diego');
  });
});
