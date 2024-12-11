import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { Auth, onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
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

@Component({
  selector: 'app-incidents',
  templateUrl: './user-incidents.page.html',
  styleUrls: ['./user-incidents.page.scss'],
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
export class UserIncidentsPage implements OnInit {
  incidents: any[] = [];
  selectedCategory: string = 'all';
  currentUser: any = null;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.fetchUserIncidents('all'); // Fetch incidents for the logged-in user
      } else {
        console.error('No user is signed in');
        alert('Please log in to view your incidents.');
      }
    });
  }

  fetchUserIncidents(category: string = 'all'): void {
    if (!this.currentUser) {
      console.error('Cannot fetch incidents without an authenticated user.');
      return;
    }

    // Define the incidents collection
    const incidentsCollection = collection(this.firestore, 'incidents');

    // Build the query for user-specific incidents
    let userQuery;
    if (category !== 'all') {
      userQuery = query(
        incidentsCollection,
        where('userId', '==', this.currentUser.uid),
        where('type', '==', category)
      );
    } else {
      userQuery = query(
        incidentsCollection,
        where('userId', '==', this.currentUser.uid)
      );
    }

    // Fetch documents from Firestore
    getDocs(userQuery)
      .then((snapshot) => {
        this.incidents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date:
            doc.data()['timestamp'] instanceof Timestamp
              ? doc.data()['timestamp'].toDate()
              : null,
        }));

        console.log('Fetched incidents:', this.incidents);
      })
      .catch((error) => {
        console.error('Error fetching user-specific incidents:', error);
      });
  }
  deleteIncident(incidentId: string): void {
    deleteDoc(doc(this.firestore, 'incidents', incidentId))
      .then(() => {
        alert('Incident successfully deleted!');
        this.fetchUserIncidents(this.selectedCategory);
      })
      .catch((error) => {
        console.error('Error deleting incident: ', error);
      });
  }

  editIncident(incident: any) {
    const incidentWithId = { ...incident, id: incident.id };
    this.router.navigate(['/report'], { state: { incident: incidentWithId } });
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.fetchUserIncidents(this.selectedCategory);
  }
}
