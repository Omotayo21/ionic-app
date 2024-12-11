import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonFooter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonLabel,
  IonList,
  IonButton,
  IonItem,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonCardContent,
  IonBackButton,
  IonCardSubtitle,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonNote,
} from '@ionic/angular/standalone';
import { Timestamp } from '@angular/fire/firestore';
@Component({
  selector: 'app-incident-reports',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonLabel,
    IonList,
    IonButton,
    IonItem,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonInput,
    IonBackButton,
    IonCardSubtitle,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonNote,
    IonCardContent,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class IncidentsComponent implements OnInit {
  incidents: any[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.fetchIncidents('all'); // Load all incidents by default
  }

  async fetchIncidents(category: string) {
    const incidentCollection: CollectionReference = collection(
      this.firestore,
      'incidents'
    );

    let querySnapshot;
    if (category && category !== 'all') {
      const q = query(incidentCollection, where('type', '==', category));
      querySnapshot = await getDocs(q);
    } else {
      querySnapshot = await getDocs(incidentCollection);
    }

    this.incidents = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date:
          data['timestamp'] instanceof Timestamp
            ? data['timestamp'].toDate()
            : null,
      };
    });
  }

  filterIncidents(category: string) {
    this.fetchIncidents(category);
  }
}
