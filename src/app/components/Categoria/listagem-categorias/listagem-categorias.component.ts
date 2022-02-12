import { CategoriasService } from './../../../services/categorias.service';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  categorias = new MatTableDataSource<any>();
  displayedColumns!: string[];

  constructor(private categoriasService: CategoriasService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    debugger
    this.categoriasService.PegarTodos().subscribe(res => {
      this.categorias.data = res;
      console.log(res);
    });

    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas(): string[] {
    return ['nome', 'icone', 'tipo', 'acoes']
  }

  AbrirDialog(categoriaId: any, nome: any): void {
    debugger
    this.dialog.open(DialogExclusaoCategoriasComponent, {
      data: {
        categoriaId: categoriaId,
        nome: nome
      }
    }).afterClosed().subscribe(res => {
      if (res === true) {
        this.categoriasService.PegarTodos().subscribe((dados) => {
          this.categorias.data = dados;
        });
        this.displayedColumns = this.ExibirColunas();
        this.ngOnInit();
      }
    });
  }

}

@Component({
  selector: 'app-dialog-exclusao-categorias',
  templateUrl: 'dialog-exclusao-categorias.html'
})

export class DialogExclusaoCategoriasComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public dados: any,
    private categoriaService: CategoriasService) { }

  ExcluirCategoria(categoriaId: any): void {
    debugger
    this.categoriaService.ExcluirCategoria(categoriaId).subscribe(res => {

    });
  }
}