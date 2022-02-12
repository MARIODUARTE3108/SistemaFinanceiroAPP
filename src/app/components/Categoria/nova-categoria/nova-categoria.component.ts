import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposService } from './../../../services/tipos.service';
import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['../listagem-categorias/listagem-categorias.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  formulario: any;
  tipos!: Tipo[];

  constructor(private tipoService: TiposService, private categoriasService: CategoriasService,
    private router: Router) { }

  ngOnInit(): void {
    this.tipoService.PegarTodos().subscribe(res => {
      this.tipos = res;
      console.log(res);
    });

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      icone: new FormControl(null),
      tipoId: new FormControl(null),
    })
  }
  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const categoria = this.formulario.value;
    debugger
    this.categoriasService.NovaCategoria(categoria).subscribe(
      (res) => {
        console.log(res);
        this.VoltarListagem();
      });
  }

  VoltarListagem(): void {
    this.router.navigate(['categorias/listagemcategorias'])
  }
}
