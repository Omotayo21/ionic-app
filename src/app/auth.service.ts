import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<any> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<any> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }
}
