import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';


interface Usuario{
  codigo: string,
  contrasena: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Login';

  usuario: Usuario = {codigo: '', contrasena:''};

  constructor() { }

  ngOnInit(): void {
  }

  autenticar(): void {
    const contrasena = Md5.hashStr(this.usuario.contrasena);
    alert("datos"+ contrasena);
  }
}
