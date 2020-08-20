import {Component, OnInit} from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public coolAssColors = [
    {from: '#8ef378', to: '#1cbbb4'},
    {from: '#e95f62', to: '#f286a0'},
    {from: '#dfe4ef', to: '#899cfc'},
    {from: '#dff7df', to: '#98f286'},
    {from: '#2aeeff', to: '#5580eb'},
    {from: '#fdb9be', to: '#e95a7d'},
    {from: '#ffdbd5', to: '#fe69bd'},
    {from: '#f1f9d3', to: '#31EEFD'},
    {from: '#c4eaf3', to: '#85c8de'}
  ];

  public gradient: string = '';

  public answerShouldBe = 0;
  public answer: string = '';
  public question: string = '4 x 6';

  public right = 0;
  public total = 0;
  public totalTime = '0:00';
  public currentTime = '0:00';
  public startTime = moment();
  public currentStartTime = moment();

  constructor(public toastController: ToastController) {}

  ngOnInit(): void {
    this.generateQuestion();
    this.pickNewBackground();

    setInterval(() => {
      const seconds = moment.duration(moment().diff(this.startTime)).seconds();
      const minutes = moment.duration(moment().diff(this.startTime)).minutes();
      this.totalTime = `${minutes}:${String(seconds).padStart(2, '0')}`
    }, 1000);

    setInterval(() => {
      const seconds = moment.duration(moment().diff(this.currentStartTime)).seconds();
      const minutes = moment.duration(moment().diff(this.currentStartTime)).minutes();
      this.currentTime = `${minutes}:${String(seconds).padStart(2, '0')}`
    }, 1000);
  }

  public generateQuestion() {
    const a = Math.floor(Math.random() * 100)
    const b = Math.floor(Math.random() * 100)
    const sign = Math.random() > 0.5 ? '+' : '-';
    this.answerShouldBe = sign === '+' ? a + b : a - b;

    this.question = `${a} ${sign} ${b}`;
  }

  private pickNewBackground() {
    const set = this.coolAssColors[Math.floor(Math.random() * this.coolAssColors.length)];

    this.gradient = `linear-gradient(30deg, ${set.from}, ${set.to})`
  }

  public async submit() {
    this.total++;

    let result;

    if (this.answerShouldBe == this.answer) {
      result = 'Correct :)';
      this.right++;
    } else {
      result = 'Nope :(';
    }

    const toast = await this.toastController.create({
      message: result,
      duration: 1000,
      position: 'top'
    });

    await toast.present();

    // Clear //
    this.pickNewBackground();
    this.generateQuestion();
    this.answer = '';
    this.currentStartTime = moment();
  }

  public press(button) {
    this.answer += button;
  }

  public backspace() {
    if (this.answer.length > 0) {
      this.answer = this.answer.substring(0, this.answer.length - 1);
    }
  }
}
