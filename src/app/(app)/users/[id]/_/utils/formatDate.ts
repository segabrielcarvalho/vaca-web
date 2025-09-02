import moment from "moment";
import "moment/locale/pt-br";

export const formatDate = (v?: string | null) =>
  v ? moment(v).locale("pt-br").format("LLL") : "—";
