import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Users,
  ClipboardList,
  Webhook,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "@/store/features/auth/authSlice";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const user = useSelector((state) => state.auth.user?.user);

  useEffect(() => {
    if (!user) {
      setMessage("You are not logged in. Redirecting you to login page");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else if (user.role !== 1) {
      setMessage(
        "You are not authorized to access this resource. Redirecting you to home page"
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err, { autoClose: 1000 });
      });
  };

  if (message) {
    return (
      <div className='flex  items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-3xlx'>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      {/* Desktop Menu */}
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-4 sticky top-0 left-0'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link
              to='/admin'
              className='flex items-center gap-2 font-semibold'>
              <Webhook className='h-6 w-6' />
              <span className='text-xl'>Shopwave</span>
            </Link>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <Link
                to='/admin'
                className='flex items-center gap-3 text-[16px] rounded-lg px-3 py-3 hover:text-muted-foreground text-foregroundtransition-all'>
                <Home className='h-5 w-5' />
                Dashboard
              </Link>
              <Link
                to='/admin/categories'
                className='flex items-center gap-3 text-[16px] rounded-lg px-3 py-3 hover:text-muted-foreground text-foreground transition-all'>
                <ClipboardList className='h-5 w-5' />
                Categories{" "}
              </Link>
              <Link
                to='/admin/products'
                className='flex items-center gap-3 text-[16px] rounded-lg px-3 py-3 hover:text-muted-foreground text-foreground transition-all'>
                <Package className='h-5 w-5' />
                Products{" "}
              </Link>
              <Link
                to='/admin/orders'
                className='flex items-center gap-3 text-[16px] rounded-lg px-3 py-3 hover:text-muted-foreground text-foreground transition-all'>
                <ShoppingCart className='h-5 w-5' />
                Orders
                {/* <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                  6
                </Badge> */}
              </Link>
              <Link
                to='/admin/users'
                className='flex items-center gap-3 text-[16px] rounded-lg px-3 py-3 hover:text-muted-foreground text-foreground transition-all'>
                <Users className='h-5 w-5' />
                Users
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        {/* Mobile Menu */}
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='left'
              className='flex flex-col'>
              <nav className='grid gap-4 text-lg font-medium'>
                <Link
                  to='/admin'
                  className='flex items-center gap-2 text-lg font-semibold'>
                  <Webhook className='h-10 w-10' />
                  <span className='sr-only'>Shopwave</span>
                </Link>
                <Link
                  to='/admin'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground text-foreground'>
                  <Home className='h-5 w-5' />
                  Dashboard
                </Link>
                <Link
                  to='/admin/products'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground text-foreground'>
                  <Package className='h-5 w-5' />
                  Products
                </Link>
                <Link
                  to='/admin/categories'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground text-foreground'>
                  <ClipboardList className='h-5 w-5' />
                  Categories{" "}
                </Link>
                <Link
                  to='/admin/orders'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground text-foreground'>
                  <ShoppingCart className='h-5 w-5' />
                  Orders
                  {/* <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                    6
                  </Badge> */}
                </Link>
                <Link
                  to='/admin/users'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground text-foreground'>
                  <Users className='h-5 w-5' />
                  Users
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className='w-full flex-1'>
            <form>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search products...'
                  className='w-full appearance-none bg-background border-none pl-8 shadow-none md:w-2/3 lg:w-1/3'
                />
              </div>
            </form>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='secondary'
                size='icon'
                className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <button
                className='px-2 py-1 text-sm'
                onClick={handleLogout}>
                Logout
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Right Side */}
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
