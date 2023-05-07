import Feed from "@/components/Feed";

const Home = () => {
	return (
		<div className=" w-full flex-col flex-center ">
			<h1 className=" text-center head_text ">
				Discover & Share
				<br className="max-md:hidden" />
				<span className="orange_gradient text-center ml-2">
					AI-Powered Prompts
				</span>
			</h1>
			<p className=" desc text-center ">
				Proompts is a open-source project that uses AI promting tool for
				the modern world to discover and share AI prompts.
			</p>
			<Feed />
		</div>
	);
};

export default Home;
