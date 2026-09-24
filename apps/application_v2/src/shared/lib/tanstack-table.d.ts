import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<_TData extends RowData, _TValue> {
    hideOnMobile?: boolean;
    hideOnDesktop?: boolean;
    hideBelowFullHD?: boolean;
    hideBelowXL?: boolean;
    showBelowXL?: boolean;
    grow?: boolean;
  }
}
