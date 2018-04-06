import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAAn-XkNhWXLV7bz2eqHavv_ZxdGDomDwE",
      authDomain: "ng-recipe-book-88c25.firebaseapp.com",
    });
  }

  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
