import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter(); // this is to pass value to homeComponent
model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    // console.log(this.model);
    // add it to the services
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    // pass the value false to home component
    this.cancelRegister.emit(false);
    console.log ('cancelled');
  }

}
