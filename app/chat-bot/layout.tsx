import LoggedInLayout from "@/components/layouts/LoggedInLayout";

export default function ChatBotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoggedInLayout>{children}</LoggedInLayout>;
}
