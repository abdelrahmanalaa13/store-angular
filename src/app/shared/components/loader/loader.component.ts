import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoadingResults = true;
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    this.storageService.getLoading().subscribe(loading => this.isLoadingResults = loading);
  }
  
}
