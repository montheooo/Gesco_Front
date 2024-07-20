import { Client } from "../models/client"
import { InvoiceLigneDTO } from "../modelsDTO/invoiceLigneDTO"

export interface InvoiceDTO{

  client:Client,
  invoiceReference:string
  invoiceDate: string
  invoiceLines: InvoiceLigneDTO[],
  status:string
  montantFacture:number

}
