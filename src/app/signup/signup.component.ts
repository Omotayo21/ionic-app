import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
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
  IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonIcon,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async signup() {
    try {
      await this.authService.signup(this.email, this.password);
      console.log('Signup successful!');
      this.router.navigate(['/login']); // Navigate to login page
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  }
}
