import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Headers } from '../../models/headers.model';
import { Observable, defer } from 'rxjs';
import { TableRow } from '../../models/tableRow.model';
import { TableService } from '../../services/table.service';
import { Search } from '../../models/search.model';
import { MyFilter } from '../../models/filter.model';
import { PopoverService } from '../popover/popover.service';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [TableService]
})
export class TableComponent {

  table$: Observable<TableRow[]> = defer(() => this.tableService.rows$);
  search$: Observable<Search[]> = defer(() => this.tableService.search$);
  init$: Observable<any> = defer(() => this.tableService.init$());

  filterOverlays: Record<string, OverlayRef> = {};

  headers: Headers[] = [
    {name: 'Бренд', search: true},
    {name: 'Артикул', search: true}, 
    {name: 'Наименование товара', search: true}, 
    {name: 'Цена', search: true},
    {name: 'Наличие', search: false},
    {name: 'Страна', search: true},
    {name: 'Год', search: true}  
  ];

  constructor(
    private tableService: TableService,
    private popoverService: PopoverService
  ) {}

  openPopover(origin: HTMLElement, content: TemplateRef<any>, header: string) {
    const overlayRef = this.filterOverlays[header];

    if (overlayRef) {
      overlayRef.dispose();
      this.filterOverlays[header] = undefined;
      return;
    }
    
    this.filterOverlays[header] = this.popoverService.open(origin, content);
  }

  // setNewFilters(filter: MyFilter) {
  //   filter = (...filter);
  // }

}
