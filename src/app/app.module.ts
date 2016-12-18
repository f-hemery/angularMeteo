import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {ChartsModule} from 'ng2-charts/components/charts/charts';
import '../../node_modules/chart.js/dist/Chart.min.js';
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {ChartPage} from "../pages/chart/chart";
import {VillesPage} from "../pages/villes/villes";
import { Storage } from '@ionic/storage';
import { VillesService } from '../services/VillesService';
import {WeatherService} from "../services/WeatherService";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        VillesPage,
        ChartPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        ChartsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        VillesPage,
        ChartPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, WeatherService, VillesService]
})
export class AppModule {
}
