import { Article } from "./article";
import { Depot } from "./depot";

export interface InvoiceLine {

  article: Article,
  depot: Depot,
  prix_unitaire: number,
  quantite: number

}
