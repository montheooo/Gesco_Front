import { Client } from "./client"
import { InvoiceLine } from "./invoiceLine"

export interface Invoice{

  client:Client,
  invoiceReference:string
  invoiceDate: Date
  invoiceLines: InvoiceLine[]


}
