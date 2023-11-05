import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';
import { ListaServiceService } from '../services/lista/lista-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoServiceService } from '../services/productos/producto-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-shopping-list',
  templateUrl: './detail-shopping-list.component.html',
  styleUrls: ['./detail-shopping-list.component.css']
})
export class DetailShoppingListComponent {

  productoForm = new FormGroup({
    producto : new FormControl('', Validators.required),
  })

  empadronadosList: any=[];
  dataSource: any;
  displayedColumns:string[]=["Nombre Producto", "Precio", "Estado","Fecha" , "Nombre Proveedor"]
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  isLoading = true;

  allProducts:any;

  constructor(public listaService: ListaServiceService, public userService: UserServiceService, private router: Router, public productService:ProductoServiceService) {
    //console.log(window.history.state['list']); // should log out 'bar'
  }

  
  ngOnInit() {

    this.productService.getAllProducts().subscribe(
      (allData)=>{
        console.log(allData)
        this.allProducts=allData;
      },
      err => 
      {
        console.log("No hay productos registrados")
      }
    )
    
    this.listaService.getListaProducto(this.userService.getUsername(), window.history.state['list']['nombre']).subscribe(
     (allData)=>{
        this.isLoading = false;
        this.empadronadosList = allData;
        this.dataSource=new MatTableDataSource(this.empadronadosList);
        this.dataSource.paginator = this.paginator;

     },
     err => 
     {
        Swal.fire({title:'Atención', text:err['error'], icon:'warning', confirmButtonColor: '#0F2041', iconColor:'#9B1111'});
     }
    );

 } 

  onSubmit(){
    if(this.productoForm.invalid){
      return;
    }
    console.log(this.productoForm.value)
  }
}
