import { Component } from '@angular/core';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { WatchService } from './services/watch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'watches-ui';

  instagramIcon = faInstagram;

  isLoggedIn?: boolean;
  token?: string;


  constructor(private watchService: WatchService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.watchService.getIsLoggedIn();
    this.token = localStorage.getItem('jwtToken')!;
    if(this.token != null || this.token != undefined) {
      this.isLoggedIn = true;
      this.watchService.setIsLoggedIn(this.isLoggedIn);
    }
    else {
      this.isLoggedIn = false;
      this.watchService.setIsLoggedIn(this.isLoggedIn);
    }
  }
  ngDoCheck(): void {
    this.isLoggedIn = this.watchService.getIsLoggedIn();
  }


  logout()  {
    this.watchService.logout();
    window.location.reload();
  }
}
