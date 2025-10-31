import { LogOut } from "lucide-react";
import { useLogout } from "../../hooks/useAuth";

function Header() {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">대시보드</h2>
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-4 h-4" />
          <span>{isPending ? "로그아웃 중..." : "로그아웃"}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
