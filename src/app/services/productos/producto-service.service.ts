import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  constructor(private http: HttpClient, private userService:UserServiceService) { }


  getAllProducts(){
    return this.http.get('http://localhost:8080/api/producto/listar/', { headers : 
    {   
        'Authorization': `Bearer ${this.userService.getToken()}`  
    } });
  }
}
