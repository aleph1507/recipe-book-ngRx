import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router){}

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      response => console.log(response)
    )
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                // console.log('signin token: ');
                // console.log(token);
                this.token = token;
              }
            );
          // console.log(response);
        }
      )
      .catch(
        error => console.log(error)
      )
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => {
            // console.log('promise token: ');
            // console.log(token);
            this.token = token;
            // console.log('after signin token: ');
            // console.log(this.token);
          }
        );

      // console.log('this.token: ');
      // console.log(this.token);

      return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  //test@test.com testtest
}
