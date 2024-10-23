import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  isEditing: boolean[] = [];
  dashboardVersion: string = 'v1';

  // Existing notifications and alerts
  notifications = [
    { message: 'New user registration: John Doe', time: 'just now' },
    { message: 'System update completed successfully', time: '5 minutes ago' },
    { message: 'New comment on your post', time: '10 minutes ago' },
    { message: 'Server maintenance scheduled for 3 PM', time: '1 hour ago' }
  ];

  alerts = [
    { message: 'High CPU usage detected', time: 'just now' },
    { message: 'Low disk space warning', time: '2 hours ago' },
    { message: 'New security update available', time: '1 day ago' },
    { message: 'Unexpected error in application', time: '30 minutes ago' },
    { message: 'Database backup completed', time: '4 hours ago' }
  ];
  deletedWidgets: Array<GridsterItem> = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.options = {
      gridType: 'fit',
      compactType: 'compactUp&Left',
      margin: 15,
      outerMargin: true,
      minCols: 6,
      maxCols: 100,
      minRows: 2,
      maxRows: 100,
      draggable: {
        enabled: true,
        ignoreContentClass: 'card-content',
        dragHandleClass: 'card-header',
      },
      resizable: {
        enabled: true,
        handles: {
          s: true,
          e: true,
          n: false,
          w: false,
          se: true,
          ne: false,
          sw: false,
          nw: false
        }
      },
      pushItems: true,
      pushResizeItems: true,
      disableScrollHorizontal: true,
      disableScrollVertical: true
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0, title: 'OverView', content: '', id: 1 },
      { cols: 2, rows: 2, y: 0, x: 2, title: 'Performance', content: 'performance', id: 2 },
      { cols: 1, rows: 1, y: 1, x: 4, title: 'Notifications', content: '', id: 3 },
      { cols: 1, rows: 1, y: 0, x: 5, title: 'Alerts', content: '', id: 4 },
      { cols: 1, rows: 2, y: 0, x: 3, title: 'Additional Info', content: '', id: 5 }
    ];

    this.isEditing = new Array(this.dashboard.length).fill(false);
  }

  ngOnInit() {
    this.loadDashboard();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  addWidget() {
    const newWidget: GridsterItem = { cols: 1, rows: 1, y: 0, x: 0, title: 'New Widget', content: 'New Content', id: Date.now() };
    this.dashboard.push(newWidget);
    this.isEditing.push(true);
    this.cdr.detectChanges();
  }

  editWidget(index: number) {
    this.isEditing[index] = true;
  }

  saveWidget(index: number) {
    this.isEditing[index] = false;
    this.saveDashboard();
  }

  deleteWidget(index: number) {
    const deletedWidget = this.dashboard[index];
    this.deletedWidgets.push(deletedWidget);
    this.dashboard.splice(index, 1);
    this.isEditing.splice(index, 1);
    this.cdr.detectChanges();
    this.saveDashboard();
  }

  restoreWidget() {
    if (this.deletedWidgets.length > 0) {
      const restoredWidget = this.deletedWidgets.pop();
      this.dashboard.push(restoredWidget!);
      this.isEditing.push(false);
      this.cdr.detectChanges();
      this.saveDashboard();
    } else {
      alert('No widgets to restore.');
    }
  }

  trackByIndex(index: number) {
    return index;
  }

  saveDashboard() {
    const savedData = {
      version: this.dashboardVersion,
      dashboard: this.dashboard,
      isEditing: this.isEditing
    };
    localStorage.setItem('dashboardData', JSON.stringify(savedData));
  }

  loadDashboard() {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.version === this.dashboardVersion) {
        this.dashboard = parsedData.dashboard;
        this.isEditing = parsedData.isEditing;
      }
    }
  }

  clearLocalStorage() {
    localStorage.removeItem('dashboardData');
  }

  resolveAlerts() {
    this.alerts = [];
    alert('All alerts have been resolved.');
  }

  viewAllNotifications() {
    alert(this.notifications.map(notification => `${notification.message} (${notification.time})`).join('\n'));

  }
}
