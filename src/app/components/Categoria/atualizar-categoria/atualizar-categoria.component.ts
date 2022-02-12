import { FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposService } from './../../../services/tipos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tipo } from 'src/app/models/Tipo';
import { Categoria } from 'src/app/models/Categoria';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['../listagem-categorias/listagem-categorias.component.css']
})
export class AtualizarCategoriaComponent implements OnInit {

  categoria!: Observable<Categoria>;
  tipos !: Tipo[];
  nomeCategoria!: string;
  formulario: any;
  categoriaId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tiposService: TiposService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit(): void {

    this.categoriaId = this.route.snapshot.params['id'];
    console.log("Id", this.categoriaId);

    this.tiposService.PegarTodos().subscribe((res) => {
      this.tipos = res;
      console.log("Tipos", res);
    })

    this.categoriasService.PegarCategoriaPeloId(this.categoriaId).subscribe((res) => {
      console.log(res);
      this.nomeCategoria = res.nome;
      this.formulario = new FormGroup({
        categoriaId: new FormControl(res.categoriaId),
        nome: new FormControl(res.nome),
        icone: new FormControl(res.icone),
        tipoId: new FormControl(res.tipoId),
      });
    });
  }

  get Propriedade() {
    return this.formulario.controls;
  }

  VoltarListagem(): void {
    this.router.navigate(['categorias/listagemcategorias'])
  }

  EnviarFormulario(): void {
    debugger
    const categoria = this.formulario.value;

    this.categoriasService.AtualizarCategoria(this.categoriaId, categoria).subscribe(res => {
      this.VoltarListagem();
    })
  }

}
