import { Component, OnInit } from '@angular/core';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }
  searchQuery: string = '';

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Search query:', this.searchQuery);
    }
  }
}
