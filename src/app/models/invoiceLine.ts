import { Article } from "./article";
import { Depot } from "./depot";
import { Invoice } from "./invoice";

export interface InvoiceLine {

  idLigne: number,
  nomArticle: string,
  nomDepot: string,
  prixUnitaire: number,
  quantite: number,
  idArticle:number,
  idDepot:number


}
