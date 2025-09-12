// app/provider-wrapper.jsx
import { AppProvider } from "./component/AppContext";
import { getAuthSession } from "./lib/auth";

export default async function ProviderWrapper({ children }) {
  const session = await getAuthSession();

  return <AppProvider session={session}>{children}</AppProvider>;
}
