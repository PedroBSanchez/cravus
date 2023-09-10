interface InterfaceCreateItem {
  description: string;
  value: number;
  amount: number;
  code: any;
}

interface InterfaceEditItem {
  id: string;
  description: string;
  value: number;
  isActive: boolean | null;
}

interface InterfaceEditAmountItem {
  id: string;
  amount: number;
}

export { InterfaceCreateItem, InterfaceEditItem, InterfaceEditAmountItem };
