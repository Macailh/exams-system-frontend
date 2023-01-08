import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public user = {
    username : '',
    password : '',
    name : '',
    lastname : '',
    email : '',
    phone : ''
  }

  constructor(private userService:UserService) {}

  ngOnInit(): void {

  }

  formSubmit() {
    console.log(this.user)
    if(this.user.username == '' || this.user.username == null) {
      alert('El nombre de usuario es requerido')
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data)
        alert('Usuario guardado con exito')
      }, (error) => {
        console.log(error)
      }
    )
  }

}
