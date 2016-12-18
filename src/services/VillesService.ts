/**
 * Created by hemery on 30/11/2016.
 */
import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
//import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Ville} from "../entities/Ville";

@Injectable()
export class VillesService {

    constructor(public storage: Storage) {
    }

    getVilles():Observable<Ville[]> {
        // let obs = (Observable.fromPromise(this.storage.get('villes')));
        // obs.subscribe(this.toVille);
        return Observable.fromPromise(this.storage.get('villes'))
            .map(this.mapVilles);
    }

    mapVilles = (r:string):Ville[] => {
        // console.log(JSON.parse(r));
        return JSON.parse(r).map(this.toVille);
    }

    toVille = (r: any):Ville => {
            let ville = <Ville>({
                nom: r.nom,
            });
            // console.log('Parsed ville:', ville);
            return ville;
    }

    save(ville):Observable<Ville[]>{
        let newVille = JSON.stringify(ville);
        return Observable.fromPromise(this.storage.set('villes', newVille))
            .map(this.mapVilles);
    }
}
