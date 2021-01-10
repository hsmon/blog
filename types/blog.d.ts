export interface Contents {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  tags: Tags[];
}

export interface Tags {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
}

export interface Key {
  headers: {
    "X-API-KEY": string;
  };
}

export interface Response {
  contents: Contents[];
  totalCount: number;
  offset: number;
  limit: number;
}