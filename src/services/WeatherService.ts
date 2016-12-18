/**
 * Created by hemery on 26/11/2016.
 */
import {Http, Response, Headers} from "@angular/http";
// import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable";
// import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Weather} from "../entities/Weather";
import {VillesService} from "./VillesService";
import {Ville} from "../entities/Ville";


@Injectable()
export class WeatherService {
    private villes: Ville[] = [];
    private _appid = '5116806a639babe72560a40fabb86221';


    constructor(private http: Http, private villesService: VillesService) {
    }

    getAll(): Observable<Weather[]> {

        this.villesService.getVilles().subscribe( villes => {
            villes.forEach( ville => { console.log("retour meteo : ", this.getMeteo('weather?q=', ville))});
        });

        return this.villesService.getVilles().map(this.arrayVille2ArrayWeather);


/*

        return Observable.from(weathers);
*/


        /*
        this.villesService.getVilles().subscribe((data) => {
            console.log(data);
            data.forEach(ville => {
                return this.getWeather('weather&q=', ville);
            });
        });
         this.villes.forEach(ville => {
         return this.getWeather('weather&q=', ville);
         })

         var responseStream = requestStream
         .flatMap(function(requestUrl) {
         return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
         });
         let weathers$ = this.http
         .get(`http://api.openweathermap.org/data/2.5/${url}${city}&mode=json&units=metric&lang=fr&APPID=${this._appid}`)
         .map(this.mapPersons);
         return weathers$;
         */
    }

/*
    arrayVille2ArrayWeather = (villes: Ville[]):Weather[] => {
        let weathers:Weather[] =[];
        console.log("les données : ", villes);
        villes.forEach(ville => {
            console.log("la ville dans getAll", ville);
            return this.getWeather('weather?q=', ville).subscribe(res => weathers.push(res));
        });
        console.log("dans getAll ", weathers);
        return weathers;
    }
*/

    arrayVille2ArrayWeather = (villes: Ville[]):Weather[] => {
        let weathers:Weather[] = [];
        let _ici = this;
        console.log("les données : ", villes);
        return villes.map(ville => {
            let weather: Weather;
            console.log("la ville dans getAll", ville);
            _ici.getWeather('weather?q=', ville).subscribe(res => {weather = res});
            return weather;
        });
    }


    public getWeather(url: string, ville: Ville): Observable<Weather> {
        let weather: Weather;
        let request = `http://api.openweathermap.org/data/2.5/${url}${ville.nom}&mode=json&units=metric&lang=fr&APPID=${this._appid}`;
//        console.log("dans getWeather url : ", url, " ville : ", ville, " request : ", request);
        return this.http.get(request).map(response => {
            weather = this.mapWeather(response);
            console.log("weather : ", weather);
            return weather;
        });
//        return this.http.get(request).map(this.mapWeather);
//         return weather;
    }


    public getMeteo(url: string, ville: Ville): Weather {
        let weather: Weather;
        let request = `http://api.openweathermap.org/data/2.5/${url}${ville.nom}&mode=json&units=metric&lang=fr&APPID=${this._appid}`;
        this.http.get(request).subscribe( response => {
            weather = this.mapWeather(response);
        });
        return weather;
    }

    private getHeaders():Headers {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    mapWeather = (response: Response): Weather => {
        // console.log("dans mapWeather : ", response.json());
        return this.toWeather(response.json());
    }

    private getVilles() {
        this.villesService.getVilles().subscribe((data) => {
            this.villes = data;
        });
    }


    toWeather = (r: any): Weather => {
        let weather = <Weather>({
            id: r.id,
            ville: r.name,
            lat: r.coord.lat,
            lon: r.coord.lon,
            currentWeather: r.main.temp,
            currentWeatherDate: new Date(r.dt * 1000),
            currentWeatherIcon: r.weather.icon,
            maxTemp: r.main.temp_max,
            minTemp: r.main.temp_min,
        });
        // console.log('Parsed weather:', weather);
        return weather;
    }

}