import MainContainer from "../MainContainer";
import AppDes from "~/components/AppIntroduce";

export default function Home() {
	return (
		<MainContainer>
			<div className="transition-all z-20 relative max-w-5xl mx-auto px-12">
				<div className="pt-8 pb-12 relative">
					<div className="pt-6 sm:pt-10 flex items-center justify-center">
						<AppDes />
					</div>
				</div>
			</div>
		</MainContainer>
	);
}
