import { Client } from "./client"
import { InvoiceLine } from "./invoiceLine"

export interface Invoice{

  nomClient:Client,
  referenceFacture:string
  dateFacture: Date
  ligneFactures: InvoiceLine[],
  montantFacture:number


}
