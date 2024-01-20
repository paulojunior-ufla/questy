import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TentativaPage } from './tentativa.page';
import { SharedModule } from '@app/app/shared/shared.module';
import { TrustContentPipe } from './trust-content.pipe';
import { JogadaComponent } from '../components/jogada/jogada.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TentativaPage
      }
    ])
  ],
  declarations: [TentativaPage, TrustContentPipe, JogadaComponent]
})
export class TentativaPageModule { }
