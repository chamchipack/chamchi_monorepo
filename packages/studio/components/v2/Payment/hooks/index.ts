export type Collection =
  | "student"
  | "session"
  | "class"
  | "attendance"
  | "payment"
  | "instructor";

export interface ButtonOptions {
  batchExcel: boolean;
  excel: boolean;
  register: boolean;
  modify: boolean;
  delete: boolean;
}

export const buttonOptions: ButtonOptions = {
  batchExcel: false,
  excel: true,
  register: true,
  modify: true,
  delete: true,
};

export enum DrawerType {
  "none" = "none",
  "form" = "form",
  "upload" = "upload",
  "download" = "download",
}

export enum OpenType {
  "none" = "none",
  "create" = "create",
  "update" = "update",
}
