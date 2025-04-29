import bgImage from "@/assets/landingImage/Rectangle 12.png";
import girlImage from "@/assets/landingImage/girlImg.png";
import iceCream from "@/assets/landingImage/iceCream.png";
import stro from "@/assets/landingImage/stro.png";
import insta from "@/assets/landingImage/insta.svg";
import fb from "@/assets/landingImage/fb.svg";
import twt from "@/assets/landingImage/tw.svg";
import BG from "@/assets/landingImage/BG.png";
import busImage from "@/assets/landingImage/busImage.png";
import wakkerImage from "@/assets/landingImage/wakkerImage.png";
import sketImage from "@/assets/landingImage/sketImage.png";
import peianoImage from "@/assets/landingImage/peianoImage.png";

import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import NextImage from "next/image";


export const metadata = {
	title: "ACME Storefront, powered by Saleor & Next.js",
	description:
		"Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.",
};

export default async function Page({ params }: { params: { channel: string } }) {
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	// const products = data.collection?.products.edges.map(({ node: product }) => product);
	{/* <h2 className="sr-only">Product list</h2>
			<ProductList products={products} /> */}
	return (
		<section className="relative h-auto">
			<div className="relative w-full flex items-center justify-between pl-32 p-16">
				<div className="z-10 flex flex-col absolute left-2 top-30 gap-2">
					<div className="p-2 border-2 border-dashed border-[#37061A] rounded-full bg-[#F8BFD6]">
						<NextImage
							src={twt}
							className=""
							alt=""
						/>
					</div>
					<div className="p-2 border-2 border-dashed border-[#37061A] rounded-full bg-[#F8BFD6]">
						<NextImage
							src={insta}
							className=""
							alt=""
						/>
					</div>
					<div className="p-2 border-2 border-dashed border-[#37061A] rounded-full bg-[#F8BFD6]">
						<NextImage
							src={fb}
							className=""
							alt=""
						/>
					</div>
				</div>
				<NextImage
					src={bgImage}
					className="absolute h-[calc(100vh-20px)] z-0 w-full left-0 right-0 -top-20 bottom-0"
					alt="Background Shape Bottom"
				/>
				<div className="z-10 flex flex-col gap-4 items-start " >
					<button className="relative font-poppins text-white text-sm rounded-md bg-[#123454] px-8 py-4">
						<NextImage
							src={iceCream}
							className="h-8 w-8  absolute -top-2 -left-2 object-contain object-center"
							alt="Background Shape Bottom"
						/>
						<NextImage
							src={stro}
							className="h-6 w-6 absolute  -bottom-2 -right-2  object-contain object-center"
							alt="Background Shape Bottom"
						/>
						Welcome to Babus!</button>
					<p className="text-6xl text-white font-bold font-baloo">Best <span className="font-baloo text-[#F8BFD6]">Toys</span> for <br></br> Your Kids to Play</p>
					<button className="font-baloo text-2xl text-[#E62875]  border-2 border-dashed border-[#E62875] bg-[#FAFEAB] rounded-full px-3 py-1.5">
						Shop now!</button>
				</div>
				<div className="z-10" >
					<NextImage
						src={girlImage}
						className="h-full min-w-[35rem] w-[35rem] object-contain object-center p-2"
						alt="Background Shape Bottom"
					/>
				</div>
			</div>
			<div
				className="h-[100vh] border mt-32 relative  flex items-center justify-center">
				<NextImage
					src={BG}
					className="absolute top-0 bottom-0 w-full h-[100vh] z-0"
					alt=""
				/>
				<div className="columns-1 sm:columns-2 gap-4 w-full max-w-[720px] mx-auto">
					{/* Card 1 */}
					<div className="bg-[#FDF1F6] rounded-2xl p-4 mb-4 inline-block w-full break-inside-avoid">
						<p className="font-baloo text-[#EB5190] text-xl mb-2">sip, smile, and go!</p>
						<div className="w-full h-[160px] overflow-hidden flex items-center justify-center mb-3">
							<NextImage src={busImage} alt="Bus" className="object-contain w-full h-full" />
						</div>
						<button className="px-5 py-2 bg-[#EB5190] text-white text-sm rounded-full font-semibold">Shop Now!</button>
					</div>

					{/* Card 2 */}
					<div className="bg-[#D9E9F7] rounded-2xl p-4 mb-4 inline-block w-full break-inside-avoid">
						<p className="font-baloo text-[#3687D3] text-xl mb-2">step fun, safe, and exciting!</p>
						<div className="w-full h-[320px] overflow-hidden flex items-center justify-center mb-3">
							<NextImage src={wakkerImage} alt="Walker" className="object-contain w-full h-full" />
						</div>
						<button className="px-5 py-2 bg-[#3687D3] text-white text-sm rounded-full font-semibold">Shop Now!</button>
					</div>

					<div className="bg-[#D9E9F7] rounded-2xl p-4 mb-4 inline-block w-full break-inside-avoid">
						<p className="font-baloo text-[#3687D3] text-xl mb-2">ride, glide, and shine!</p>
						<div className="w-full h-[260px] overflow-hidden flex items-center justify-center mb-3">
							<NextImage src={sketImage} alt="Scooter" className="object-contain w-full h-full" />
						</div>
						<button className="px-5 py-2 bg-[#3687D3] text-white text-sm rounded-full font-semibold">Shop Now!</button>
					</div>

					{/* Card 3 */}
					
					{/* Card 4 */}
					<div className="bg-[#FDF1F6] rounded-2xl p-4 mb-4 inline-block w-full break-inside-avoid">
						<p className="font-baloo text-[#EB5190] text-xl mb-2">explore sounds, rhythm, and creativity!</p>
						<div className="w-full h-[240px] overflow-hidden flex items-center justify-center mb-3">
							<NextImage src={peianoImage} alt="Piano" className="object-contain w-full h-full" />
						</div>
						<button className="px-5 py-2 bg-[#EB5190] text-white text-sm rounded-full font-semibold">Shop Now!</button>
					</div>
				</div>




			</div>
		</section>
	);
}
