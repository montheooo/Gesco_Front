import { Client } from "../models/client"
import { InvoiceLine } from "../models/invoiceLine"

export interface InvoiceDTO{

  client:Client,
  invoiceReference:string
  invoiceDate: string
  invoiceLines: InvoiceLine[],
  status:string

}
