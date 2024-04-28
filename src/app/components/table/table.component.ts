import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { TableRow } from '../../models/tableRow.model';
import { TableService } from '../../services/table.service';
import { PopoverService } from '../popover/popover.service';
import { TableFilter, TableFilterType, TableHeader } from '../../models/filter.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [TableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  table$: Observable<TableRow[]> = defer(() => this.tableService.rows$);
  // filters$: Observable<TableFilter> = defer(() => this.tableService.getFilterTable$());
  init$: Observable<any> = defer(() => this.tableService.init$());

  filterOverlays: Record<string, boolean> = {};

  headers: TableHeader[] = [
    {id: 'brand', name: 'Бренд', filterType: 'text'},
    {id: 'article', name: 'Артикул', filterType: 'text'},
    {id: 'name', name: 'Наименование товара', filterType: 'text'},
    {id: 'cost', name: 'Цена', filterType: 'text'},
    {id: 'isExistence', name: 'Наличие', filterType: 'switcher'},
    {id: 'country', name: 'Страна', filterType: 'text'},
    {id: 'year', name: 'Год', filterType: 'text'}
  ];

  constructor(
    private tableService: TableService,
    private popoverService: PopoverService
  ) {
  }

  openPopover(header: string) {

    if (!this.filterOverlays[header]) {
      this.filterOverlays[header] = true;
      return;
    }

    this.filterOverlays[header] = !this.filterOverlays[header];
  }

  addShadow(event: Event) {
    const scrollLeft = (event.target as HTMLElement).scrollLeft;
    const shadow = document.querySelector('.func-table__tr .first') as HTMLElement;

    if (scrollLeft > 0) {
      shadow.classList.add('shadow');
    } else {
      shadow.classList.remove('shadow');
    }
  }

  setFilters(header: TableHeader, value: string | boolean) {
    this.tableService.setFilterValue(header.id, {type: header.filterType, value});
    this.openPopover(header.id);
  }

  getFilterValue$(header: TableHeader): Observable<string | boolean> {
    return this.tableService.getFilterValue$(header.id).pipe(
      map(filterValue => filterValue?.value ?? getDefaultFilterValue(header.filterType))
    );
    function getDefaultFilterValue(type: TableFilterType): string | boolean {
      return type === 'text' ? '' : false;
    }
  }

  clearFilter(header: string) {
    this.tableService.clearFilter(header);
    this.openPopover(header);
  }
}