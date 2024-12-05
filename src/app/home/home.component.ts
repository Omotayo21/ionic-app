import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
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
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
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
    IonFooter,
    CommonModule,
    RouterModule,
  ],
})
export class HomeComponent  {
  constructor(private auth: Auth, private router: Router) {}

  logout(): void {
    signOut(this.auth)
      .then(() => {
        alert('Signed out successfully!');
        this.router.navigate(['/']); // Redirect to home or login page
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
        alert('Failed to sign out. Please try again.');
      });
  }
}
