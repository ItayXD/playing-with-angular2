import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsService } from './posts.service';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes = [
  {
    path: '',
    component: HomeComponent
  },
	{
		path: 'posts',
		component: PostsComponent
	}
]
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
	  RouterModule.forRoot(appRoutes) 

  ],
  providers: [PostsService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
