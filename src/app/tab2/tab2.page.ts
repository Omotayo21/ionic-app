import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonInput,
  IonLabel,
  IonTextarea,
  IonItem,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { BlogService } from '../blog-service'; // Import the BlogService
import { ActivatedRoute, Router } from '@angular/router'; // To navigate after saving
import { FormsModule } from '@angular/forms';
import { Post } from '../post.model'; // Ensure you import the Post model

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonInput,
    IonLabel,
    IonTextarea,
    IonButton,
    IonItem,
    CommonModule,
    FormsModule,
  ],
})
export class Tab2Page implements OnInit {
  post: Post = { id: 0, title: '', content: '', img:'' }; // Ensure the post object matches the Post model
  isEditMode: boolean = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.blogService.getPostById(+params['id']).subscribe((post) => {
          if (post) {
            this.post = post;
          }
        });
      }
    });
  }

  savePost() {
    // Validate inputs
    if (!this.post.title.trim() || !this.post.content.trim()) {
      console.error('Title and content are required');
      return;
    }

    if (this.isEditMode) {
      // Update post
      this.blogService.getPosts().subscribe((posts) => {
        const updatedPosts = posts.map((p) =>
          p.id === this.post.id ? this.post : p
        );
        this.blogService.updatePosts(updatedPosts).subscribe(() => {
          console.log('Post updated successfully');
          this.router.navigate(['/tabs/index']);
        });
      });
    } else {
      // Add post
      this.blogService.addPost(this.post).subscribe(() => {
        console.log('Post added successfully');
        this.router.navigate(['/tabs/tab1']);
      });
    }
  }
}
