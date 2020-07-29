import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
   // this.loadUser();                 // resolver replaces the load user
   this.route.data.subscribe(data => {   // it removes ? in the html
     this.user = data['user'];           // because we get the data
   });                                   // before activating the root
                                        // no more safe navigation '?'

// this will receive the route from the messages-component
// the querryparams so that tab 3 will be active
   this.route.queryParams.subscribe(params => {
     const selectedTab = params['tab'];
     this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
   });

   this.galleryOptions = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }
  ];
   this.galleryImages = this.getImages();
}

      getImages() {
        const imageUrls = [];
        for (const photo of this.user.photos) {
          imageUrls.push({
            small: photo.url,
            medium: photo.url,
                big: photo.url,
            description: photo.description
          });
        }
        return imageUrls;
      }

      selectTab(tabId: number) {
        this.memberTabs.tabs[tabId].active = true;
      }

  // members/4

  // loadUser() {
  //   this.userService
  //     .getUser(+this.route.snapshot.params['id']) // add + string to convert into no.
  //     .subscribe(
  //       (user: User) => {
  //         this.user = user;
  //       },
  //       error => {
  //         this.alertify.error(error);
  //       }
  //     );
  // }

}
