import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

	posts: object[]

  constructor(private postsService: PostsService) { }

  ngOnInit() {
		this.postsService.getAllPosts().subscribe(posts => {
			this.posts = posts;
			console.log(posts)
		});
		console.log(this.posts)
  }

}
