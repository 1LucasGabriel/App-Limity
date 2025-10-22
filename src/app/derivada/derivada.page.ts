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
  public isToastOpen = false;
  public mensagem: string = '';
  public chart: any;

  constructor() { }

  ngOnInit() {
    this.criarGrafico([], []);
  }

  ionViewWillEnter() {
  }

  public calcularDerivada() {
    if (this.funcao == '') {
      this.mensagem = "Digite a função antes de calcular!";
      this.setOpen(true);
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
      this.mensagem = "Erro ao calcular. Tente novamente!";
      this.setOpen(true);
    }
  }

  public setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  public criarGrafico(xs: number[], ys: number[]) {
    const ctx = document.getElementById('graficoFuncao') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy(); 
    }

    this.chart = new Chart(ctx, {
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
