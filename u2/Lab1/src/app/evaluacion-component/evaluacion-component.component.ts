import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion-component.component.html'
})
export class EvaluacionComponent {
  nombre: string = '';
  nota1: number = 0;
  nota2: number = 0;
  comentarios: string = '';
  resultadoDado: boolean | null = null;

  dado(): boolean {
    const numero = Math.floor(Math.random() * 6) + 1;
    this.resultadoDado = numero % 2 === 0;
    return this.resultadoDado;
  }
}
