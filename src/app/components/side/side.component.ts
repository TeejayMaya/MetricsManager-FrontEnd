import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  public userData: any;
  public notificationsData: any;

  constructor(private apiService: ApiService, public authService: AuthenticationService, private router: Router) { }

  async ngOnInit() {
    //Get User Data
    await this.authService.getUserData().then(response => {
      this.userData = response;
      //this.username = response['username'];
    }).catch(err => { console.log(err); });
    this.getUserNotificationsData(this.userData); //Get User Notifications
  }

  getUserNotificationsData(userInfo: any){
    this.apiService.getUserNotificationsData(userInfo).then(response => {
      this.notificationsData = response;
    }).catch(err => { console.log(err); });
  }
}
