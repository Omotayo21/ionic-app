import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog-service';
import { Post } from '../post.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
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
    CommonModule,
    RouterModule,
  ],
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.blogService.getPosts().subscribe(
      (data: any) => {
        this.posts = data;
        //  console.log(data)
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  deletePost(postId: number) {
    this.blogService.deletePost(postId).subscribe(() => {
      console.log('Post deleted successfully');
      this.fetchPosts(); // Refresh the list
    });
  }

  /* editPost(post: Post) {
    console.log('Editing post:', post);
    this.router.navigate(['/tabs/view-post', post.id]); // Navigate to the edit page
  }

  deletePost(postId: string) {
    console.log('Deleting post with ID:', postId);
    // Call deletePost on the BlogService and update the list
    this.blogService.deletePost(postId).subscribe(
      () => {
        this.posts = this.posts.filter((post) => post.id !== postId);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }*/
}
