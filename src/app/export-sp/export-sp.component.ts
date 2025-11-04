import { Component, inject, AfterViewInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { PlatformService } from '../platform.service';
import { MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'custom-export-sp',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './export-sp.component.html',
  styleUrl: './export-sp.component.scss'
})
export class ExportSpComponent implements AfterViewInit {
  @Input() hostComponent!: any;
  
  private platformService = inject(PlatformService);

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  downloadObjectAsJson(exportObj: object, exportName: string){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode);
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
        
        while (currentElement.firstChild) {
          this.renderer.appendChild(targetDiv, currentElement.firstChild);
        }
      }
    }, 0);
  }

  private findClosestTargetInHost(): HTMLElement | null {
    let current: HTMLElement | null = this.elementRef.nativeElement.parentElement;
    
    // Walk up the DOM tree looking for the container
    while (current && current !== document.body) {
      // Check if we found the container
      if (current.classList.contains('record-actions-container')) {
        return current;
      }
      
      // Check if the container is a direct child of current element
      const found = current.querySelector('.record-actions-container');
      if (found) {
        return found as HTMLElement;
      }
      
      current = current.parentElement;
    }
    
    return null;
  }
}