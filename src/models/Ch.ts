class Ch {
  public client: string;
  public value: number;
  public depositDate: Date;
  public isOpen: boolean;
  public created_at: Date;

  constructor(
    client: string,
    value: number,
    depositDate: Date,
    isOpen: boolean,
    created_at: Date
  ) {
    this.client = client;
    this.value = value;
    this.depositDate = depositDate;
    this.isOpen = isOpen;
    this.created_at = created_at;
  }
}

export { Ch };
