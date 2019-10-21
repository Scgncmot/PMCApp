import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { NavController } from '@ionic/angular';
@Injectable()
export class MainService {
  public user: Observable<Usuario>;
  range:number = 1;
  constructor(private geolocation: Geolocation,
    private fns: AngularFireFunctions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private navCtrl: NavController) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          let obs = this.afs.doc(`usuarios/${user.uid}`).valueChanges();
          return obs;
        } else {
          return of(null);
        }
      })
    );
  }


  encontrarUsuariosCercanos(sport) {

    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          let location = {
            lat: resp.coords.latitude,
            lon: resp.coords.longitude
          }
          const callable = this.fns.httpsCallable('addMessage');
          let result = callable({ location: location, sport: sport, range: this.range });
          resolve(result.toPromise());
        }).catch((error) => {
          console.log('Error getting location', error);
          reject(error);
        })
    })

  }
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.navigateRoot('/');
  }
  locationFind() {

  }
  crearUsuario(usuario, uid) {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          let location = {
            lat: resp.coords.latitude,
            lon: resp.coords.longitude
          }
          usuario.location = location
          resolve(this.afs.doc(`usuarios/${uid}`).set(usuario));
        }).catch((error) => {
          console.log('Error getting location', error);
          reject(error);
        })
    })



  }
}
