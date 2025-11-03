import { Component, inject, OnInit, Input } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store'
import { Observable, map, pipe } from 'rxjs';
import { PlatformService } from '../platform.service';

export const selectSearchState = createFeatureSelector<any>('Search');
export const selectFullDisplayState = createFeatureSelector<any>('full-display');
export const selectFullDisplayRecordId = createSelector(selectFullDisplayState, state => state.selectedRecordId );


@Component({
  selector: 'custom-export-sp',
  standalone: true,
  imports: [],
  templateUrl: './export-sp.component.html',
  styleUrl: './export-sp.component.scss'
})
export class ExportSpComponent {
  private platformService = inject(PlatformService);

  downloadObjectAsJson(exportObj: object, exportName: string){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  onClick() {
    this.downloadObjectAsJson(
      this.platformService.getItems(), 
      "items"
    )
  }

}
