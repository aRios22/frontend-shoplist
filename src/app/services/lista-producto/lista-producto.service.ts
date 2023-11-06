import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListaProductoService {

  constructor(private http: HttpClient, private userService:UserServiceService) { }

  createListaProductos(data:any, listaCompras:any, usuario:any){
    return this.http.post('http://localhost:8080/api/lista-producto/registrar/?usuario='+usuario+'&listacompras='+listaCompras+'&producto='+data['producto'], null, { headers : 
    {   
        'Authorization': `Bearer ${this.userService.getToken()}`  
    } });
  }

  deleteListaProductos(nombre:any, listaCompras:any, usuario:any){
    return this.http.delete('http://localhost:8080/api/lista-producto/eliminar/?usuario='+usuario+'&listacompras='+listaCompras+'&producto='+nombre,{ headers : 
    {   
        'Authorization': `Bearer ${this.userService.getToken()}`  
    } });
  }

  shopListaProductos(nombre:any, listaCompras:any, usuario:any){
    return this.http.get('http://localhost:8080/api/lista-producto/comprar/?usuario='+usuario+'&listacompras='+listaCompras+'&producto='+nombre,{ headers : 
    {   
        'Authorization': `Bearer ${this.userService.getToken()}`  
    } });
  }
}
