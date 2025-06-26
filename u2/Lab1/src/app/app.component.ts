import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'lab1';

  ngOnInit(): void {
    // let calculator = new Calculator();
    // console.log("TEST CALCULATOR")
    
    // let result = calculator.multiply(3, 7);
    // console.log("1. Test Multiply");
    // console.log("3 * 7 = 21 ?", result === 21);
    // console.log("3 * 7 != 34 ?", result !== 34);

    // let result2 = calculator.divide(10, 2);
    // console.log("2. Test Divide");
    // console.log("10 / 2 = 5 ?", result2 === 5);
    // console.log("10 / 2 != 3 ?", result2 !== 3);

    // let result3 = calculator.divide(10, 0);
    // console.log("10 / 0 = null ?", result3 === null);
  }
}
