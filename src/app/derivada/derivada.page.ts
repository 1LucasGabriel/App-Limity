import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardContent, IonCardHeader, IonItem, IonList, IonButton, IonInput, IonToast, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/angular/standalone';
import { derivative, evaluate } from 'mathjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-derivada',
  templateUrl: './derivada.page.html',
  styleUrls: ['./derivada.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonToast, IonButton, IonList, IonItem, IonCardHeader, IonCardContent, IonCard, IonContent, IonInput, CommonModule, FormsModule]
})
export class DerivadaPage implements OnInit {

  public funcao: any = '';
  public resultado: any = null;
  public abrirToast = false;
  public mensagemToast: string = '';
  public grafico: any;

  constructor() { }

  ngOnInit() {
    this.criarGrafico([], []);
  }

  ionViewWillEnter() {
  }

  public calcularDerivada() {
    if (this.funcao == '') {
      this.mensagemToast = "Digite a função antes de calcular!";
      this.exibirErro(true);
      return;
    }

    try {
      this.resultado = derivative(this.funcao, 'x').toString();

      const xs: number[] = [];
      const ys: number[] = [];
      for (let x = -10; x <= 10; x += 0.5) {
        try {
          const y = evaluate(this.resultado, { x });
          xs.push(x);
          ys.push(y);
        } 
        catch { }
      }

      setTimeout(() => {
        this.criarGrafico(xs, ys);
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

  public criarGrafico(xs: number[], ys: number[]) {
    const novoGrafico = document.getElementById('graficoFuncao') as HTMLCanvasElement;

    if (this.grafico) {
      this.grafico.destroy(); 
    }

    this.grafico = new Chart(novoGrafico, {
      type: 'line',
      data: {
        labels: xs,
        datasets: [{
          label: 'f\'(x)',
          data: ys,
          borderWidth: 2,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: { title: { display: true, text: 'x' } },
          y: { title: { display: true, text: 'f\'(x)' } }
        }
      }
    });
  }

  public handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
      this.resultado = null;
      this.funcao = '';
    }, 1000);
  }

}
