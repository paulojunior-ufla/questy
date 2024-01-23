import { NgModule } from '@angular/core';

import { HistoricoPage } from './historico.page';
import { SharedModule } from '@app/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HistoricoPage
      }
    ])
  ],
  declarations: [HistoricoPage]
})
export class HistoricoPageModule {}
