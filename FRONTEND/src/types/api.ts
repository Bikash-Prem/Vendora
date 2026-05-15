export type Transaction = {
  id: number;
  item: string;
  quantity: number;
  price: number;
  total: number;
  original_text: string;
  timestamp?: string | null;
};

export type DashboardResponse = {
  summary: {
    total_sales: number;
    total_transactions: number;
  };
  top_item: {
    name: string | null;
    total_quantity: number;
  };
  transactions: Transaction[];
};

export type AddTransactionRequest = {
  text: string;
};

export type AddTransactionResponse = {
  success: boolean;
  message: string;
  normalized_text?: string;
  intent?: string;
  fraud_check?: string;
  predicted_demand?: number;
  transaction?: {
    id: number;
    item: string;
    quantity: number;
    price: number;
    total: number;
    timestamp?: string | null;
  };
};

export type InventoryItem = {
  id: number;
  item: string;
  stock: number;
  unit?: string | null;
  updated_at?: string | null;
};

export type InventoryListResponse = InventoryItem[];