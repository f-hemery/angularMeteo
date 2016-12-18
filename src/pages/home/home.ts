import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ChartPage} from "../chart/chart";
import {VillesPage} from "../villes/villes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chartRoot: any = ChartPage;
  villesRoot: any = VillesPage;

  constructor(public navCtrl: NavController) {
  }
}
