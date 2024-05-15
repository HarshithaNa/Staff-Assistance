import { CHAT_THEME } from "@/constants/chat-theme";

const Loading = () => {
  return (
    <div className="bg-stone-950 bottom-0 h-screen absolute left-24 right-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-t-transparent " style={{ borderColor: CHAT_THEME.BORDER_COLOR }} />
        <h1
          className="text-2xl font-bold"
          style={{ color: CHAT_THEME.FONT_COLOR }}
        >
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default Loading;
