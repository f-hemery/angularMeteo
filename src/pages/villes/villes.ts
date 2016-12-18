import {Component, OnInit} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {VillesService} from "../../services/VillesService";
import {WeatherService} from "../../services/WeatherService";
import {Weather} from "../../entities/Weather";
import {Ville} from "../../entities/Ville";

/*
 Generated class for the Villes page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'villes.html'
})
export class VillesPage implements OnInit {
    public villes: Ville[];
    public lesVilles = new Map();
    empty: boolean;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                private service: VillesService,
                private weather: WeatherService) {

    }

    ngOnInit() {
        this.service.getVilles().subscribe((data) => {
            this.villes = data;
            // console.log(data);
            if (this.villes == null) {
                this.villes = [];
            }
            this.setEmpty();
            this.weather.getAll().subscribe(data => {console.log('dans ngOnInit ', data)});
            // let meteoLens = new Weather();
            // meteoLens.ville = 'Lens';
            // this.getMeteo(meteoLens);
            // console.log(meteoLens.currentWeather);
            // console.log(this.villes);
        });
    }

    addVille() {
        let prompt = this.alertCtrl.create({


            title: 'Nom de la ville',
            message: "Ajouter une ville dans vos préférences",
            inputs: [
                {
                    name: 'nom',
                    placeholder: 'Nom'
                },
            ],
            buttons: [
                {
                    text: 'Annuler',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ajouter',
                    handler: data => {
                        this.villes.push({
                                nom: data.nom
                            }
                        );
                        this.service.save(this.villes);
                        this.setEmpty();
                        // this.majMeteo();
                    }
                }
            ]
        });
        prompt.present();
    }

    deleteVille(ville) {
        this.villes = this.villes.filter((v) => {
            return v != ville
        });
        this.service.save(this.villes);
        this.setEmpty();
        // this.majMeteo();
    }

    setEmpty() {
        this.empty = this.villes.length === 0;
    }

    ionViewDidLoad() {
        console.log('Hello VillesPage Page');
    }

/*
    private majMeteo() {

    }

    private getMeteo(meteo: Weather) {
        this.weather.getWeather('weather?q=', meteo.ville).subscribe(data => {
            meteo.currentWeather = Math.round(data.main.temp);
            meteo.minTemp = Math.round(data.main.temp_min);
            meteo.maxTemp = Math.round(data.main.temp_max);
            meteo.currentWeatherIcon = data.weather[0].icon;
            meteo.currentWeatherDate = new Date(data.dt * 1000);
            console.log("temps:", meteo.currentWeather);
        });
    }
*/
}
