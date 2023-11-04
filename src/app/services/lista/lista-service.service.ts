import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListaServiceService {

  constructor(private http: HttpClient, private userService:UserServiceService) { }

  getAllListas(usuario:any){
    return this.http.get('http://localhost:8080/api/lista-compras/listar/?usuario='+usuario, { headers : 
    {   
        'Authorization': `Bearer ${this.userService.getToken()}`  
    } });
  }

  createListaCompras(data:any, usuario:any){
    return this.http.post('http://localhost:8080/api/lista-compras/registrar/?usuario='+usuario, data, { headers : 
    {   
        'Authorization': `Bearer ${this.userService.getToken()}`  
    } });
  }
}
