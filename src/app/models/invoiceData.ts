import { Article } from "./article";
import { Client } from "./client";
import { Depot } from "./depot";

export interface InvoiceData {

  clients: Client[]
  depots: Depot[]
  articles: Article[]

}
