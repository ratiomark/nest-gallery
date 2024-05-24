"use client";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      <div>
        {/* все что в signedout будет отрисовано, только для не вошедших пользователей */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex">
            <UploadButton
              content={{
                button: "Upload files",
              }}
              className="rounded-md border border-cyan-400 bg-transparent p-0 text-sm  hover:bg-gray-100"
              appearance={{
                allowedContent: {
                  display: "none",
                },
                clearBtn: {
                  background: "red",
                  padding: "0px",
                },
                button: {
                  color: "gray",
                  backgroundColor: "transparent",
                  padding: "6px 8px",
                  width: "auto",
                  height: "auto",
                },
                container: {
                  padding: "0px",
                  width: "auto",
                  height: "auto",
                },
              }}
              endpoint="imageUploaderCustomName"
              onClientUploadComplete={() => router.refresh()}
            />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
