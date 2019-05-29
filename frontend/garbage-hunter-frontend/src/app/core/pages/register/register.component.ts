import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private userRegister = {
    email: "",
    password: ""
  }
  private passwordConfirm: String = "";
  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  submitRegister(){
    if (this.userRegister.email != "" && this.userRegister.password != ""
    && this.passwordConfirm.trim() == this.userRegister.password.trim()){
      this.userService.addUser(this.userRegister).subscribe(res => {
        console.log(res);
      });
    } else {
      console.log("password and password confirm not the same");
    }
  }

}
