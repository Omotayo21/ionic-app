import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://api.jsonbin.io/v3/b/66e600d6ad19ca34f8a60685';
  private headers = new HttpHeaders({
    'X-Master-Key':
      '$2a$10$Hz9vTESkcpmqRFawksCfYenkkhs.wLNWsIihEBXR2EHfFNa95Pmha',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // Fetch all posts
  getPosts(): Observable<Post[]> {
    return this.http
      .get<any>(`${this.apiUrl}/latest`, { headers: this.headers })
      .pipe(
        map((response) => response.record.posts) // Extract "posts" from the response
      );
  }

  // Add a new post
  addPost(newPost: { title: string; content: string }): Observable<any> {
    return this.getPosts().pipe(
      map((posts) => {
        const updatedPosts = [
          ...posts,
          { ...newPost, id: Date.now() }, // Add a unique ID using the timestamp
        ];
        return updatedPosts;
      }),
      switchMap((updatedPosts) =>
        this.http.put(
          `${this.apiUrl}`,
          { posts: updatedPosts },
          { headers: this.headers }
        )
      )
    );
  }

  // Update all posts (overwrites existing posts with updated ones)
  updatePosts(posts: Post[]): Observable<any> {
    return this.http.put(
      `${this.apiUrl}`,
      { posts },
      { headers: this.headers }
    );
  }

  // Delete a post by ID
  deletePost(postId: number): Observable<any> {
    return this.getPosts().pipe(
      map((posts) => posts.filter((post) => post.id !== postId)), // Filter out the post to delete
      switchMap((updatedPosts) =>
        this.http.put(
          `${this.apiUrl}`,
          { posts: updatedPosts },
          { headers: this.headers }
        )
      )
    );
  }

  // Get a single post by ID
  getPostById(postId: number): Observable<Post | undefined> {
    return this.getPosts().pipe(
      map((posts) => posts.find((post) => post.id === postId)) // Find the post by its ID
    );
  }
}
