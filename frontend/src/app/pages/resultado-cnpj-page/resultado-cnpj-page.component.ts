import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ConsultaCnpjService } from '../../services/consulta-cnpj.service';

@Component({
  selector: 'app-resultado-cnpj-page',
  imports: [RouterLink],
  templateUrl: './resultado-cnpj-page.component.html',
  styleUrl: './resultado-cnpj-page.component.css'
})
export class ResultadoCnpjPageComponent {
  private readonly router = inject(Router);
  protected readonly consultaCnpjService = inject(ConsultaCnpjService);

  protected readonly linhasTabela = computed(() => {
    const resultado = this.consultaCnpjService.resultado();
    if (!resultado) {
      return [];
    }

    const camposOcultos = new Set(['billing', 'qsa']);

    return Object.entries(resultado)
      .filter(([campo]) => !camposOcultos.has(campo.toLowerCase()))
      .map(([campo, valor]) => ({
        campo: this.formatarCampo(campo),
        valor: this.formatarValor(valor)
      }));
  });

  constructor() {
    if (!this.consultaCnpjService.resultado()) {
      this.router.navigate(['/']);
    }
  }

  protected novaConsulta(): void {
    this.consultaCnpjService.clearResultado();
    this.router.navigate(['/']);
  }

  private formatarCampo(campo: string): string {
    return campo
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  }

  private formatarValor(valor: unknown): string {
    if (valor === null || valor === undefined || valor === '') {
      return '-';
    }
    if (typeof valor === 'object') {
      return JSON.stringify(valor);
    }
    return String(valor);
  }
}
