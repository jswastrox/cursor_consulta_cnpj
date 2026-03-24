import { Routes } from '@angular/router';
import { ConsultaCnpjPageComponent } from './pages/consulta-cnpj-page/consulta-cnpj-page.component';
import { ResultadoCnpjPageComponent } from './pages/resultado-cnpj-page/resultado-cnpj-page.component';

export const routes: Routes = [
  { path: '', component: ConsultaCnpjPageComponent },
  { path: 'resultado', component: ResultadoCnpjPageComponent },
  { path: '**', redirectTo: '' }
];
