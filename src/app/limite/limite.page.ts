import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardContent, IonCard, IonCardHeader, IonItem, IonButton, IonInput, IonList, IonToast, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/angular/standalone';
import { evaluate } from 'mathjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-limite',
  templateUrl: './limite.page.html',
  styleUrls: ['./limite.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonToast, IonList, IonButton, IonItem, IonCardHeader, IonCard, IonCardContent, IonContent, IonInput, CommonModule, FormsModule]
})
export class LimitePage implements OnInit {

  public funcao: string = '';
  public pontoX: number | null = null;
  public resultado: number | null = null;

  public abrirToast = false;
  public mensagemToast: string = '';
  public grafico: any;

  constructor() { }

  ngOnInit() {
  }

  public calcularLimite() {
    if (this.funcao.trim() === '') {
      this.mensagemToast = "Digite a função antes de calcular!";
      this.exibirErro(true);
      return;
    }

    if (this.pontoX == null) {
      this.mensagemToast = "Digite o X antes de calcular!";
      this.exibirErro(true);
      return;
    }

    try {
      const x = this.pontoX;
      const expressao = this.funcao.replace(/x/g, `(${x})`);
      this.resultado = evaluate(expressao);

      setTimeout(() => {
        this.criarGrafico();
      });
    } 
    catch {
      this.mensagemToast = "Erro ao calcular. Tente novamente!";
      this.exibirErro(true);
    }
  }

  public exibirErro(mensagemAberta: boolean) {
    this.abrirToast = mensagemAberta;
  }

  private criarGrafico() {
    const novoGrafico = document.getElementById('graficoLimite') as HTMLCanvasElement;

    if (this.grafico) {
      this.grafico.destroy();
    }

    const xs: number[] = [];
    const ys: number[] = [];

    const inicio = (this.pontoX ?? 0) - 3;
    const fim = (this.pontoX ?? 0) + 3;
    const passo = 0.2;

    for (let i = inicio; i <= fim; i += passo) {
      try {
        const expressao = this.funcao.replace(/x/g, `(${i})`);
        const y = evaluate(expressao);
        xs.push(Number(i.toFixed(2)));
        ys.push(y);
      } 
      catch {
        xs.push(i);
        ys.push(NaN);
      }
    }

    this.grafico = new Chart(novoGrafico, {
      type: 'line',
      data: {
        labels: xs,
        datasets: [{
          label: 'f(x)',
          data: ys,
          borderWidth: 2,
          tension: 0.3,
          borderColor: '#3880ff',
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: { title: { display: true, text: 'x' } },
          y: { title: { display: true, text: 'f(x)' } }
        }
      }
    });
  }

  public handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
      this.resultado = null;
      this.funcao = '';
      this.pontoX = null;
    }, 1000);
  }
}
