import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyOrgPage } from './nearby-org';

@NgModule({
  declarations: [
    NearbyOrgPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyOrgPage),
  ],
})
export class NearbyOrgPageModule {}
