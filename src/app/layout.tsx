import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// const inter = Poppins({ subsets: ["latin"] });

const inter = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
	title: "How many days am alive for ?",
	description: "This is a simple web app to calculate how many days you are alive for.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
