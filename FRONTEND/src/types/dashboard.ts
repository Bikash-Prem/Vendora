export interface SummaryCardProps {
  title: string;
  amount: string;
  color: string;
  icon: string;
}

export interface TransactionCardProps {
  product: string;
  quantity: string;
  price: string;
  total: string;
  time: string;
  emoji: string;
}

export interface InsightCardProps {
  message: string;
}