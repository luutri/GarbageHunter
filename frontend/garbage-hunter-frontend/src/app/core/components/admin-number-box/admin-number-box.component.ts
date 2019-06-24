import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-number-box',
  templateUrl: './admin-number-box.component.html',
  styleUrls: ['./admin-number-box.component.scss'],
})
export class AdminNumberBoxComponent implements OnInit {
  /**
   * @description data for the box from admin page.
   * @type {*}
   * @memberof AdminNumberBoxComponent
   */
  @Input() data: any;

  constructor() {}

  ngOnInit() {}

  /**
   * @description calculate the ratio for progress bar.
   * @memberof AdminNumberBoxComponent
   */
  countProgress = (): number => {
    if (this.data) {
      return (this.data.value / this.data.maxValue) * 100;
    }
    return 0;
  };

  /**
   * @description determine the class for color of text.
   * @memberof AdminNumberBoxComponent
   */
  textColor = (): string => {
    if (this.data) {
      switch (this.data.type) {
        case 1:
          return 'text-primary';
        case 2:
          return 'text-success';
        case 3:
          return 'text-warning';
        case 4:
          return 'text-danger';
        default:
          break;
      }
    }
  };

  /**
   * @description determine the class for color of progress bar.
   * @memberof AdminNumberBoxComponent
   */
  progressBarColor = (): string => {
    if (this.data) {
      switch (this.data.type) {
        case 1:
          return 'bg-primary';
        case 2:
          return 'bg-success';
        case 3:
          return 'bg-warning';
        case 4:
          return 'bg-danger';
        default:
          break;
      }
    }
  };
}
