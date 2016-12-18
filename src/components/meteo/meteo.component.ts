import {Weather} from "../../entities/Weather";
import {OnInit} from "@angular/core";
import {WeatherService} from "../../services/WeatherService";
/**
 * Created by hemery on 10/12/2016.
 */

export class MeteoListComponent implements OnInit {
    weathers: Weather[] = [];


    constructor(private weatherService: WeatherService) {
    }

    ngOnInit(): void {

    }
}