import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConsultaCnpjService {
  private readonly storageKey = 'consulta-cnpj-resultado';
  readonly resultado = signal<Record<string, unknown> | null>(this.loadFromStorage());

  setResultado(data: Record<string, unknown>): void {
    this.resultado.set(data);
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  clearResultado(): void {
    this.resultado.set(null);
    sessionStorage.removeItem(this.storageKey);
  }

  private loadFromStorage(): Record<string, unknown> | null {
    const raw = sessionStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      sessionStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
