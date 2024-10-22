"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function WrapperLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
