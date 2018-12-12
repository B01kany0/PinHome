import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOrganizationPage } from './add-organization';

@NgModule({
  declarations: [
    AddOrganizationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOrganizationPage),
  ],
})
export class AddOrganizationPageModule {}
