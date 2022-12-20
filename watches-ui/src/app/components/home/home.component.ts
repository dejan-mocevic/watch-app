import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards = [
    {
      title: 'Rolex Daytona',
      description: 'The best chronograph watch from Rolex',
      img: '../../../assets/daytona.png'
    },
    {
      title: 'Rolex Submariner',
      description: 'The best diver sport watch from Rolex',
      img: '../../../assets/submariner.png'
    },
    {
      title: 'Patek Phellipe Nautilus',
      description: 'The best quality automatic watch of all time',
      img: '../../../assets/patek.jpg'
    },
    {
      title: 'Grand Seiko Snowflake',
      description: 'Best looking dress watch from Grand Seiko',
      img: '../../../assets/grandseiko.png'
    },

  ];


  constructor() { }

  ngOnInit(): void {
  }

}
