import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';
import { ListaServiceService } from '../services/lista/lista-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoServiceService } from '../services/productos/producto-service.service';
import Swal from 'sweetalert2';
import { ListaProductoService } from '../services/lista-producto/lista-producto.service';

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
  displayedColumns:string[]=["Nombre Producto", "Precio", "Estado","Fecha" , "Nombre Proveedor", "Opciones"]
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  isLoading = true;

  allProducts:any;

  constructor(public listaService: ListaServiceService, public userService: UserServiceService, private router: Router, 
    public productService:ProductoServiceService, public listaProductoService:ListaProductoService) {
    //console.log(window.history.state['list']); // should log out 'bar'
  }

  
  ngOnInit() {

    this.productService.getAllProducts().subscribe(
      (allData)=>{
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
      this.isLoading=false
      Swal.fire({title:'Atención', text:err['error'], icon:'warning', confirmButtonColor: '#0F2041', iconColor:'#9B1111'});
      return
     }
    );

 } 

  onSubmit(){
    if(this.productoForm.invalid){
      return;
    }
    this.listaProductoService.createListaProductos(this.productoForm.value, window.history.state['list']['nombre'], this.userService.getUsername()).subscribe(
      (response)=>{
        this.productoForm.reset();
        this.refresh()
        return
      },
      (err) => {
        Swal.fire({title:'Atención', text:err['error'], icon:'warning', confirmButtonColor: '#0F2041', iconColor:'#9B1111'});
        return
      }
    )
  }

  refresh() {
    this.listaService.getListaProducto(this.userService.getUsername(), window.history.state['list']['nombre']).subscribe(
      (allData)=>{
         this.isLoading = false;
         this.empadronadosList = allData;
         this.dataSource=new MatTableDataSource(this.empadronadosList);
         this.dataSource.paginator = this.paginator;
 
      },
      err => 
      {
        this.isLoading=false
        Swal.fire({title:'Atención', text:err['error'], icon:'warning', confirmButtonColor: '#0F2041', iconColor:'#9B1111'});
        return
      }
     );
  }

  eliminar(element:any){
    Swal.fire({
      title: '¿Desea eliminar el producto de su lista?',
      text: 'Por favor, confirme si desea Eliminar el producto ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaProductoService.deleteListaProductos(element.nombre, window.history.state['list']['nombre'], this.userService.getUsername()).subscribe(
          (response)=>{
            this.productoForm.reset();
            this.refresh()
          },
          (err) => {
            Swal.fire({title:'Atención', text:err['error'], icon:'warning', confirmButtonColor: '#0F2041', iconColor:'#9B1111'});
          }
        )

      } else if (result.isDismissed) {

        return;
      }
    })
     
  }

  comprar(element:any){
    Swal.fire({
      title: '¿Desea marcar el producto como comprado?',
      text: 'Por favor, confirme si desea comprar el producto ',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaProductoService.shopListaProductos(element.nombre, window.history.state['list']['nombre'], this.userService.getUsername()).subscribe(
          (response)=>{
            this.refresh()
          },
          (err) => {
            Swal.fire({title:'Atención', text:err['error'], icon:'warning', confirmButtonColor: '#0F2041', iconColor:'#9B1111'});
          }
        )

      } else if (result.isDismissed) {

        return;
      }
    })
  }
    
}
