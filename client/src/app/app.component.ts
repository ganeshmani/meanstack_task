import { Component,OnInit, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from './core/services/posts.service';
import { Post } from './core/models/posts.model';
import * as faker from 'faker'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
    public posts:Post;
    public postname : any;
    public description : any;
    public avatar : any;
  constructor(
      private postService : PostService,
  ){}

  ngOnInit(){
     this.getData();
  }


  getData(){


    this.postService.get().subscribe((data) => {
      if(data && data != undefined){

        // console.log(this.avatar);
        this.posts = data;
      }  
     }
    );
  }

  OnUpvote(index){
    // console.log("upvoted",index);

    // console.log(this.posts[index]);
    this.posts[index].upvotes += 1;

    this.postService.upvote(this.posts[index]._id).subscribe((data)=>{
      // console.log(data);
    })
  }

  onAddPost(){

    // console.log(this.postname);

    this.postService.save({
      name : this.postname,
      // upvotes : 0,
      avatar : faker.image.avatar(),
      description : this.description
    }).subscribe((data) => {
      console.log(data);
      this.postname = '';
      this.description = '';
      this.getData();
    })

    
  }

  


}
