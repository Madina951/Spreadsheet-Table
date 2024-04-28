export type TableFilterType = 'text' | 'switcher';

export type TableHeader = {
  id: string,
  name: string,
  filterType: TableFilterType,
};

export type TableFilter = Record<string, TableFilterValue>;

export type TableFilterValue = {
  type: TableFilterType,
  value: string | boolean
};