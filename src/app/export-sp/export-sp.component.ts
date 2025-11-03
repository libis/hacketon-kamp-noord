import { Component, inject, OnInit, AfterViewInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store'
import { Observable, map, pipe } from 'rxjs';
import { PlatformService } from '../platform.service';
import { MatIconModule} from '@angular/material/icon'
export const selectSearchState = createFeatureSelector<any>('Search');
export const selectFullDisplayState = createFeatureSelector<any>('full-display');
export const selectFullDisplayRecordId = createSelector(selectFullDisplayState, state => state.selectedRecordId );


@Component({
  selector: 'custom-export-sp',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './export-sp.component.html',
  styleUrl: './export-sp.component.scss'
})
  export class ExportSpComponent implements AfterViewInit {
  @Input() hostComponent!: any;
  
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

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

  ngAfterViewInit() {
    setTimeout(() => {
      const targetDiv = this.findClosestTargetInHost();
      
      if (targetDiv) {
        const currentElement = this.elementRef.nativeElement;
        
        // Move all children of this component to the target
        while (currentElement.firstChild) {
          this.renderer.appendChild(targetDiv, currentElement.firstChild);
        }
        
        // Optionally remove the empty wrapper element
        // this.renderer.removeChild(currentElement.parentNode, currentElement);
      } else {
        console.warn('Target div not found for this instance');
      }
    }, 0);
  }

  private findClosestTargetInHost(): HTMLElement | null {
    // Start from this component's element
    let current: HTMLElement | null = this.elementRef.nativeElement;
    
    // Walk up the DOM tree
    while (current && current !== document.body) {
      // Check if current element has the target class
      if (current.classList.contains('record-actions-container')) {
        return current;
      }
      
      // Check siblings and their children (in case it's adjacent)
      const parent = current.parentElement;
      if (parent) {
        // Look for .record-actions-container as a sibling
        const siblings = Array.from(parent.children);
        for (const sibling of siblings) {
          if (sibling.classList.contains('record-actions-container')) {
            return sibling as HTMLElement;
          }
          // Also check within siblings
          const found = sibling.querySelector('.record-actions-container');
          if (found && this.isClosestInstance(current, found as HTMLElement)) {
            return found as HTMLElement;
          }
        }
      }
      
      // Move up to parent
      current = current.parentElement;
    }
    
    return null;
  }

  private isClosestInstance(componentElement: HTMLElement, targetDiv: HTMLElement): boolean {
    // Check if this target div is the closest one to this component instance
    // by ensuring no other component instance is closer to this target
    const allComponentInstances = document.querySelectorAll('custom-export-sp');
    const currentIndex = Array.from(allComponentInstances).indexOf(componentElement);
    
    // Simple heuristic: check if target is within a reasonable ancestor scope
    let ancestor: HTMLElement | null = componentElement;
    let levels = 0;
    const maxLevels = 10; // Adjust based on your DOM structure
    
    while (ancestor && levels < maxLevels) {
      if (ancestor.contains(targetDiv)) {
        return true;
      }
      ancestor = ancestor.parentElement;
      levels++;
    }
    
    return false;
  }


}
