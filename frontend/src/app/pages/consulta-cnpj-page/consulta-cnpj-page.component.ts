import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ConsultaCnpjService } from '../../services/consulta-cnpj.service';

@Component({
  selector: 'app-consulta-cnpj-page',
  imports: [FormsModule],
  templateUrl: './consulta-cnpj-page.component.html',
  styleUrl: './consulta-cnpj-page.component.css'
})
export class ConsultaCnpjPageComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly consultaCnpjService = inject(ConsultaCnpjService);

  protected cnpj = '';
  protected loading = signal(false);
  protected error = signal('');

  protected onCnpjInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 14);
    this.cnpj = this.formatCnpj(digits);
  }

  protected consultarCnpj(): void {
    const cnpjLimpo = this.cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
      this.error.set('Informe um CNPJ valido com 14 digitos.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.http
      .get<{ cnpj: string; resultado: Record<string, unknown> }>(
        `http://localhost:8000/api/consulta-cnpj/${cnpjLimpo}`
      )
      .subscribe({
        next: (response) => {
          this.consultaCnpjService.setResultado(response.resultado);
          this.loading.set(false);
          this.router.navigate(['/resultado']);
        },
        error: (err) => {
          this.error.set(err?.error?.detail ?? 'Falha ao consultar CNPJ.');
          this.loading.set(false);
        }
      });
  }

  private formatCnpj(digits: string): string {
    const p1 = digits.slice(0, 2);
    const p2 = digits.slice(2, 5);
    const p3 = digits.slice(5, 8);
    const p4 = digits.slice(8, 12);
    const p5 = digits.slice(12, 14);

    let formatted = p1;
    if (p2) {
      formatted += `.${p2}`;
    }
    if (p3) {
      formatted += `.${p3}`;
    }
    if (p4) {
      formatted += `/${p4}`;
    }
    if (p5) {
      formatted += `-${p5}`;
    }

    return formatted;
  }
}
