import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnChanges {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() chartType: 'line' | 'pie' | 'progress-bar' = 'line';

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    yAxis: {
      title: {
        text: 'Values'
      }
    },
    series: [{
      name: 'My Series',
      type: 'line',
      data: [1, 3, 2, 4, 5]
    }]
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartType) {
      this.updateChartOptions();
    }
  }

  updateChartOptions() {
    // Update chart type
    this.chartOptions.chart = { type: this.chartType };
    this.chartOptions.title = { text: '' }; 

    // Handle different chart types
    if (this.chartType === 'pie') {
      this.chartOptions.series = [{
        type: 'pie',
        name: 'Distribution',
        data: [
          { name: 'Category A', y: 40 },
          { name: 'Category B', y: 30 },
          { name: 'Category C', y: 30 }
        ]
      }];
    } else if (this.chartType === 'progress-bar') {
      this.chartOptions = this.getProgressBarChartOptions();  // Get options for progress bar chart
    } else {
      this.chartOptions.series = [{
        name: 'My Series',
        type: 'line',
        data: [1, 3, 2, 4, 5]
      }];
    }
  }

  getProgressBarChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'column'  // Use column type for progress bar representation
      },
      title: {
        text: 'Progress Bar Chart'
      },
      xAxis: {
        categories: ['Task 1', 'Task 2', 'Task 3']  // Example categories
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Progress (%)'
        }
      },
      series: [{
        type: 'column',
        name: 'Progress',
        data: [50, 70, 30],  // Sample progress values
        dataLabels: {
          enabled: true,
          format: '{point.y}%',  // Show percentage on top of the bars
        }
      }],
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
          },
        },
      },
    };
  }
}
