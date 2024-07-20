import { Client } from "./client"
import { InvoiceLine } from "./invoiceLine"

export interface Invoice{

  nomClient:string,
  referenceFacture:string
  dateFacture: string
  ligneFactures: InvoiceLine[],
  montantFacture?:number,
  statusFacture:string,
  numeroFacrure:number
}
