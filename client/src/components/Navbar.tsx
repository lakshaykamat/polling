import { useAuth } from "../context/AuthContext";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="p-5 bg-secondary text-secondary-foreground text-primary-foreground">
      <nav className="flex justify-around">
        <h1 className="text-2xl font-medium">{user?.role}</h1>
        <div className="flex items-center gap-4">
          <ol className="flex items-center gap-6 ">
            {user ? (
              user.role === "Student" ? (
                <>
                  <li>{user.name}</li>
                  <li
                    className="cursor-pointer hover:text-red-500 hover:underline"
                    onClick={logout}
                  >
                    Logout
                  </li>
                  <ModeToggle />
                </>
              ) : (
                <>
                  <li className="hover:underline">
                    <a href="/">Home</a>
                  </li>
                  <li className="hover:underline">
                    <a href="/approved">Approved</a>
                  </li>
                  <li className="hover:underline">
                    <a href="/rejected">Rejected</a>
                  </li>
                  <li>{user.name}</li>
                  <li
                    className="cursor-pointer hover:text-red-500 hover:underline"
                    onClick={logout}
                  >
                    Logout
                  </li>
                  <ModeToggle />
                </>
              )
            ) : (
              <>
                <li className="hover:underline">
                  <a href="/">Home</a>
                </li>
                <li className="hover:underline">
                  <a href="/login">Login</a>
                </li>
                <li className="hover:underline">
                  <a href="/register">Register</a>
                </li>
                <ModeToggle />
              </>
            )}
          </ol>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
