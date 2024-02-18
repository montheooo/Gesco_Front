import { InvoiceLine } from "./invoiceLine"

export interface Invoice{

  client:string,
  invoiceReference:string
  invoiceNumber: number,
  invoiceDate: Date
  invoiceLine: InvoiceLine


}
