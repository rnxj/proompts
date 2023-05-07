"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
	const [providers, setProviders] = useState(null);
	const [toggleDropDown, settoggleDropDown] = useState(false);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchProviders = async () => {
			const providers = await getProviders();
			setProviders(providers);
		};
		fetchProviders();
	}, []);
	return (
		<nav className=" w-full mb-16 flex-between pt-3 ">
			<Link href={"/"} className="flex flex-center gap-2">
				<Image
					src={"/assets/images/logo.svg"}
					width={30}
					height={30}
					className="object-contain"
					alt="Proompts Logo"
				/>
				<p className="logo_text">Proompts</p>
			</Link>

			{/* Desktop */}
			<div className=" sm:flex hidden ">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href={"/create-prompt"} className="black_btn">
							Create post
						</Link>
						<button
							type="button"
							className=" outline-btn "
							onClick={signOut}
						>
							Sign Out
						</button>
						<Link
							href={"/profile"}
							className="flex flex-center gap-2"
						>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className="rounded-full"
								alt="Profile Picture"
							/>
						</Link>
					</div>
				) : (
					<div>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									className="black_btn"
									onClick={() =>
										signIn(provider.id, {
											callbackUrl: "/",
										})
									}
								>
									Sign in
								</button>
							))}
					</div>
				)}
			</div>

			{/* Mobile */}
			<div className=" sm:hidden flex relative">
				{session?.user ? (
					<div>
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							className="rounded-full"
							alt="Profile Picture"
							onClick={() => {
								settoggleDropDown(!toggleDropDown);
							}}
						/>
						{toggleDropDown && (
							<div className="dropdown">
								<Link
									href={"/profile"}
									className="dropdown_link"
									onClick={() => {
										settoggleDropDown(false);
									}}
								>
									My Profile
								</Link>

								<Link
									href={"/create-prompt"}
									className="dropdown_link"
									onClick={() => {
										settoggleDropDown(false);
									}}
								>
									Create post
								</Link>
								<button
									type="button"
									className=" mt-5 w-full black_btn "
									onClick={() => {
										settoggleDropDown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<div>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									className="black_btn"
									onClick={() =>
										signIn(provider.id, {
											callbackUrl: "/",
										})
									}
								>
									Sign in with {provider.name}
								</button>
							))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;
