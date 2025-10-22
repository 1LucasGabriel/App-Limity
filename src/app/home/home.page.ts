import { Component } from '@angular/core';
import { IonContent, IonCardContent, IonCard, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, arrowForwardOutline, shuffleOutline} from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonCardContent, IonContent],
})
export class HomePage {
  constructor() {
    addIcons({ homeOutline, arrowForwardOutline, shuffleOutline });
  }
}
