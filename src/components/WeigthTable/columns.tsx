"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: string;
  email: "1234567890";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "amount",
    header: "Peso",
  },
  {
    accessorKey: "status",
    header: "Fecha",
  },
];

export const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: new Date().toDateString(),
    email: "1234567890",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: new Date().toDateString(),
    email: "1234567890",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: new Date().toDateString(),
    email: "1234567890",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: new Date().toDateString(),
    email: "1234567890",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: new Date().toDateString(),
    email: "1234567890",
  },
];
