import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, combineLatest, of, from } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { NavController } from '@ionic/angular';
import { resolve, reject, async } from 'q';
import { firestore } from 'firebase/app';
import { Chat } from '../interfaces/chat';


@Injectable()
export class MainService {


  username: string;
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



  getChats() {
    return this.afs
      .collection<any>('chats')
      .valueChanges();
  }


  getUser() {
    return this.user.pipe(first()).toPromise();
  }



  async createChat(userId) {

    const idChat = this.afs.createId();

    const datos = await this.user.pipe(first()).toPromise();

    const data = {
      idChat,
      mensajes: [],
      usuario: [datos.uid, userId]
    }
    
    this.afs.collection('chats').doc(idChat).set(data);
  }


  getChat(chatId) {
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }


  async sendMessage(chatId, content) {
    const datos = await this.user.pipe(first()).toPromise();
    if (datos.uid) {
        const callable = this.fns.httpsCallable('chat');
        let data$ = callable({ id: chatId, mensajes: [{ text: content }] });
        data$.subscribe(x => {
          console.log(x);
        })
      }
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        mensajes: firestore.FieldValue.arrayUnion(content)
      });
    }

    getUserDataJoin(chat: Chat, idActual: string) {

      const uids = Array.from(new Set(chat.usuario));

      const userDocs = uids.map(u =>
        this.afs.doc(`usuarios/${u}`).valueChanges()
      );   
      
      return userDocs;

    }



    /**
     *    joinUsers2(chat$: Observable<any>) {
      
      let chat;
      const joinKeys = {};
  
      return chat$.pipe(
        switchMap((c: Chat) => {
          // Unique User IDs
          chat = c;
          const uids = Array.from(new Set(c.usuario));
  
          // Firestore User Doc Reads
          const userDocs = uids.map(u =>
            this.afs.doc('usuarios/${u}').valueChanges()
          );
  
          return userDocs.length ? combineLatest(userDocs) : of([]);
        }),
        map(arr => {
          arr.forEach(v => (joinKeys[(<any> v).uid] = v));
          chat.mensajes = chat.mensajes.map(v => {
            
            return { ...v, user: joinKeys[v.idSender] };
          });
          chat.users = []
          chat.usuario.forEach((element,i,arr) => {
            chat.users[i] = joinKeys[element];
          });

          return chat;
        })
      );
    }  
     */

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

  crearUsuario(usuario) {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          let location = {
            lat: resp.coords.latitude,
            lon: resp.coords.longitude
          }
          usuario.location = location
          resolve(this.afs.doc(`usuarios/${usuario.uid}`).set(usuario));
        }).catch((error) => {
          console.log('Error getting location', error);
          reject(error);
        })
    })
  }
}
