import { Component, OnInit } from '@angular/core';
import{AuthService} from
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor( private authService:AuthService ) { }
  private user: UserInterface ={
    name:''
  }
  ngOnInit(): void {
  }

}
