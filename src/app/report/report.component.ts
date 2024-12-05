import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage'; // AngularFire Storage
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

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
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
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
    IonImg,
  ],
})
export class ReportComponent {
  incident = {
    type: '',
    title: '',
    description: '',
    image: '',
    userId: '',
  };

  isUploading = false; // Flag to indicate if an image is being uploaded

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth
  ) {}

  ngOnInit() {
    // Get the authenticated user's ID
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.incident.userId = user.uid; // Set userId in the incident object
      } else {
        alert('You need to be logged in to submit an incident.');
      }
    });
  }

  async uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    this.isUploading = true; // Set uploading flag to true
    try {
      const filePath = `incident-images/${new Date().getTime()}_${file.name}`;
      const storageReference = storageRef(this.storage, filePath);

      // Upload the image
      const uploadTask = await uploadBytes(storageReference, file);

      // Get the image URL
      this.incident.image = await getDownloadURL(uploadTask.ref);
      console.log('Image uploaded successfully. URL:', this.incident.image);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      this.isUploading = false; // Reset uploading flag
    }
  }

  async submitIncident() {
    if (!this.incident.userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    if (!this.incident.title || !this.incident.description) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isUploading) {
      alert('Image is still uploading. Please wait.');
      return;
    }

    if (!this.incident.image) {
      alert('Image upload failed or no image uploaded.');
      return;
    }

    try {
      const incidentsCollection = collection(this.firestore, 'incidents'); // Firestore collection reference
      await addDoc(incidentsCollection, {
        type: this.incident.type,
        title: this.incident.title,
        description: this.incident.description,
        image: this.incident.image,
        userId: this.incident.userId, // Include userId in the document
        timestamp: new Date().toISOString(),
      });

      alert('Incident submitted successfully!');
      // Reset the form
      this.incident = {
        type: '',
        title: '',
        description: '',
        image: '',
        userId: this.incident.userId, // Retain the userId
      };
    } catch (error) {
      console.error('Error submitting incident:', error);
      alert('Failed to submit the incident. Please try again.');
    }
  }
}
