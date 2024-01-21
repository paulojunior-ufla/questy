import { NgModule } from '@angular/core';


import { ConquistasPage } from './conquistas.page';
import { SharedModule } from '@app/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConquistasPage
      }
    ])
  ],
  declarations: [ConquistasPage]
})
export class ConquistasPageModule { }
