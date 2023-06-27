import { api } from "~/utils/api";

type Session = {
  id: string;
  date: string;
  slots: string[];
};

export function getOrdersByUsername(username: string, queryKey: Session[]) {
  api.order.getOrdersByUsername.useQuery({ username: username }, {
    onSuccess: (data) => {
      return data;
    },
    queryKey: [queryKey],
  } as {
    onSuccess: (data: []) => void;
  });
}
