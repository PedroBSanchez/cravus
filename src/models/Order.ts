class Order {
  public city: string;
  public client: string;
  public items: Array<object>;
  public total: number;
  public createdAt: Date;
  public seller: object;
  public code: number;
  constructor(
    city: string,
    client: string,
    items: Array<object>,
    total: number,
    createdAt: Date,
    seller: object,
    code: number
  ) {
    this.city = city;
    this.client = client;
    this.items = items;
    this.total = total;
    this.createdAt = createdAt;
    this.seller = seller;
    this.code = code;
  }
}

export { Order };
