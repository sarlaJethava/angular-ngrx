import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ]),
    SharedModule
  ]
})
export class AuthModule {}
