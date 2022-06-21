export interface Item {
  photo: string;
  name: string;
  description: string;
  quantity: number;
  color: string;
  weight: string;
  id: number;
  size: { width: number; height: number; depth: number };
  comments: ItemComment[];
}

export interface ItemComment {
  name: string;
  text: string;
  id: number;
  date: string;
}

export interface DispatchObj {
  type: string;
  payload?: {
    statusCode: number;
    statusMessage: string;
    messages?: string[];
    data: any;
  };
}

export interface MatchProps {
  id: string;
}
