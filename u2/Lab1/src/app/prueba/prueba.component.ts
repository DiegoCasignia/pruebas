import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  nombre: string = '';
  mensaje: string = '';

  saludar(): void {
    this.mensaje = `Hola, ${this.nombre}`;
  }
}
