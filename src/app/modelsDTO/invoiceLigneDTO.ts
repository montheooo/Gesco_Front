import { Article } from "../models/article"
import { Client } from "../models/client"
import { Depot } from "../models/depot"
import { InvoiceLine } from "../models/invoiceLine"

export interface InvoiceLigneDTO{

  article:Article,
  idLigne:number,
  depot:Depot,
  prixUnitaire: number,
  quantite: number,
}
