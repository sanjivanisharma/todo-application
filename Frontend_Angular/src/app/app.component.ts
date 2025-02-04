import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'todo-application';

  constructor(private service: UserService, ) {}

  ngOnInit(): void {
      
  }

  get user(): any {
    const token = this.service.getAccessToken()
    if(token !== null) {
      const decoded = atob(token)
      const [username, password] = decoded.split(':')
      return username
    } else {
      return ''
    }
  }

  logout() {
    this.service.logout()
  }
}
