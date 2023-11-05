import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ListaServiceService } from '../services/lista/lista-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  crearListaForm = new FormGroup({
    nombre : new FormControl('', Validators.required),
    fecha : new FormControl('', Validators.required),
  })

  empadronadosList: any=[];
  dataSource: any;
  displayedColumns:string[]=["Nombre Lista", "Fecha", "Opciones"]
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  isLoading = true;

  constructor(public listaService: ListaServiceService, public userService: UserServiceService, public router: Router) {}

  onSubmit() {
    

    if(this.crearListaForm.invalid){
      return;
    }
   this.listaService.createListaCompras(this.crearListaForm.value, this.userService.getUsername()).subscribe(
    (response)=>{
      this.crearListaForm.reset();
      this.refresh()
    },
    (err) => {
      Swal.fire({title:'Atención', text:err['error'], icon:'warning', confirmButtonColor: '#0F2041', iconColor:'#9B1111'});
    }
  )
  }

  ngOnInit() {
    
     this.listaService.getAllListas(this.userService.getUsername()).subscribe(
      (allData)=>{
        this.isLoading = false;
        this.empadronadosList = allData;
        this.dataSource=new MatTableDataSource(this.empadronadosList);
        this.dataSource.paginator = this.paginator;

      },
      err => 
      {
        this.isLoading = false;
      }
     );

  } 

  refresh() {
    this.listaService.getAllListas(this.userService.getUsername()).subscribe(
      (allData)=>{
        this.isLoading = false;
        this.empadronadosList = allData;
        this.dataSource=new MatTableDataSource(this.empadronadosList);
        this.dataSource.paginator = this.paginator;

      },
      err => 
      {
        this.isLoading = false;
      }
     );
  }

  detalle(element:any){
    console.log("Abre pagina gestion de la lista")
    this.router.navigate(['detail-shopping-list'], {state:{list:element}});
  }

}
