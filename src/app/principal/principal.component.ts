import { Component } from '@angular/core';
import { EventoService } from '../servico/evento.service';
import { Evento } from '../modelo/Evento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {


  // Objeto do tipo Cliente
  evento = new Evento();

  // Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  // Variável para visibilidade da tabela
  tabela: boolean = true;

  // JSON de clientes
  eventos: Evento[] = [];

  // Construtor
  constructor(private servico: EventoService, private snackBar: MatSnackBar) { }

  // Método de seleção
  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => {
        this.eventos = retorno.content;
      });
  }

  cadastrar(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Preencha os campos obrigatórios!', 'Fechar', { duration: 5000 });
      return;
    }

    this.servico.cadastrar(this.evento).subscribe({
      next: (retorno) => {
        // Cadastrar o evento no vetor
        this.eventos.push(retorno);

        // Limpar formulário
        this.evento = new Evento();

        // Mensagem de sucesso
        this.snackBar.open('Evento cadastrado com sucesso!', 'Fechar', { duration: 5000 });

      },
      error: (erro) => {
        // Mensagem de erro
        this.snackBar.open('Erro ao cadastrar o evento. Tente novamente.', 'Fechar', { duration: 5000 });
        console.error('Erro no cadastro:', erro);

      }
    });
  }



  // Método para selecionar um cliente específico
  selecionarCliente(posicao: number): void {

    // Selecionar cliente no vetor
    this.evento = this.eventos[posicao];

    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;

  }

  // Método para editar clientes
  editar(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Preencha os campos obrigatórios!', 'Fechar', { duration: 5000 });
      return;
    }

    this.servico.editar(this.evento).subscribe({
      next: (retorno) => {
        // Obter posição do vetor onde está o cliente
        let posicao = this.eventos.findIndex(obj => obj.id === retorno.id);

        // Alterar os dados do cliente no vetor
        this.eventos[posicao] = retorno;

        // Limpar formulário
        this.evento = new Evento();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem de sucesso
        this.snackBar.open('Evento alterado com sucesso!', 'Fechar', { duration: 5000 });
      },
      error: (erro) => {
        // Mensagem de erro
        this.snackBar.open('Erro ao editar o evento. Tente novamente.', 'Fechar', { duration: 5000 });
        console.error('Erro na edição:', erro);
      }
    });
  }


  // Método para remover clientes
  remover(): void {
    this.servico.remover(this.evento.id!).subscribe({
      next: () => {
        // Obter posição do vetor onde está o cliente
        let posicao = this.eventos.findIndex(obj => obj.id === this.evento.id);

        // Remover cliente do vetor
        this.eventos.splice(posicao, 1);

        // Limpar formulário
        this.evento = new Evento();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem de sucesso
        this.snackBar.open('Evento removido com sucesso!', 'Fechar', { duration: 5000 });
      },
      error: (erro) => {
        // Mensagem de erro
        this.snackBar.open('Erro ao remover o evento. Tente novamente.', 'Fechar', { duration: 5000 });
        console.error('Erro na remoção:', erro);
      }
    });
  }


  // Método para cancelar
  cancelar(): void {

    // Limpar formulário
    this.evento = new Evento();

    // Visibilidade dos botões
    this.btnCadastro = true;

    // Visibilidade da tabela
    this.tabela = true;

  }

  // Método de inicialização
  ngOnInit() {
    this.selecionar();
  }

}
