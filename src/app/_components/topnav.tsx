import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
	UserButton,
} from "@clerk/nextjs";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      <div>
        {/* все что в signedout будет отрисовано, только для не вошедших пользователей */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
