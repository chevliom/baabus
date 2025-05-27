"use client";
import React, { useRef, useState } from "react";
import NextImage from "next/image";
import pdfImage from "../../../../../assets/retailerImage/pdf.png";
import imageFile from "../../../../../assets/retailerImage/imageFile.png";

export const Icon = ({ IconName }: { IconName: string }) => {
	if (IconName == "uploadFile") {
		return (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M8.71 7.71087L11 5.41087V15.0009C11 15.2661 11.1054 15.5204 11.2929 15.708C11.4804 15.8955 11.7348 16.0009 12 16.0009C12.2652 16.0009 12.5196 15.8955 12.7071 15.708C12.8946 15.5204 13 15.2661 13 15.0009V5.41087L15.29 7.71087C15.383 7.8046 15.4936 7.879 15.6154 7.92976C15.7373 7.98053 15.868 8.00667 16 8.00667C16.132 8.00667 16.2627 7.98053 16.3846 7.92976C16.5064 7.879 16.617 7.8046 16.71 7.71087C16.8037 7.61791 16.8781 7.50731 16.9289 7.38545C16.9797 7.26359 17.0058 7.13288 17.0058 7.00087C17.0058 6.86886 16.9797 6.73816 16.9289 6.6163C16.8781 6.49444 16.8037 6.38384 16.71 6.29087L12.71 2.29087C12.6149 2.19983 12.5028 2.12847 12.38 2.08087C12.1365 1.98085 11.8635 1.98085 11.62 2.08087C11.4972 2.12847 11.3851 2.19983 11.29 2.29087L7.29 6.29087C7.19676 6.38411 7.1228 6.4948 7.07234 6.61662C7.02188 6.73845 6.99591 6.86901 6.99591 7.00087C6.99591 7.13273 7.02188 7.2633 7.07234 7.38512C7.1228 7.50694 7.19676 7.61763 7.29 7.71087C7.38324 7.80411 7.49393 7.87807 7.61575 7.92853C7.73757 7.97899 7.86814 8.00496 8 8.00496C8.13186 8.00496 8.26243 7.97899 8.38425 7.92853C8.50607 7.87807 8.61676 7.80411 8.71 7.71087ZM21 14.0009C20.7348 14.0009 20.4804 14.1062 20.2929 14.2938C20.1054 14.4813 20 14.7357 20 15.0009V19.0009C20 19.2661 19.8946 19.5204 19.7071 19.708C19.5196 19.8955 19.2652 20.0009 19 20.0009H5C4.73478 20.0009 4.48043 19.8955 4.29289 19.708C4.10536 19.5204 4 19.2661 4 19.0009V15.0009C4 14.7357 3.89464 14.4813 3.70711 14.2938C3.51957 14.1062 3.26522 14.0009 3 14.0009C2.73478 14.0009 2.48043 14.1062 2.29289 14.2938C2.10536 14.4813 2 14.7357 2 15.0009V19.0009C2 19.7965 2.31607 20.5596 2.87868 21.1222C3.44129 21.6848 4.20435 22.0009 5 22.0009H19C19.7956 22.0009 20.5587 21.6848 21.1213 21.1222C21.6839 20.5596 22 19.7965 22 19.0009V15.0009C22 14.7357 21.8946 14.4813 21.7071 14.2938C21.5196 14.1062 21.2652 14.0009 21 14.0009Z"
					fill="white"
				/>
			</svg>
		);
	}

	if ((IconName = "blackUploadFile")) {
		return (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M7.4 9.9943H8.99V14.9943C8.99 15.5443 9.44 15.9943 9.99 15.9943H13.99C14.54 15.9943 14.99 15.5443 14.99 14.9943V9.9943H16.58C17.47 9.9943 17.92 8.9143 17.29 8.2843L12.7 3.6943C12.6075 3.6016 12.4976 3.52805 12.3766 3.47787C12.2557 3.42769 12.126 3.40186 11.995 3.40186C11.864 3.40186 11.7343 3.42769 11.6134 3.47787C11.4924 3.52805 11.3825 3.6016 11.29 3.6943L6.7 8.2843C6.07 8.9143 6.51 9.9943 7.4 9.9943ZM5 18.9943C5 19.5443 5.45 19.9943 6 19.9943H18C18.55 19.9943 19 19.5443 19 18.9943C19 18.4443 18.55 17.9943 18 17.9943H6C5.45 17.9943 5 18.4443 5 18.9943Z"
					fill="black"
				/>
			</svg>
		);
	}
};

function GstDocuments() {
	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (selected && (selected.type === "application/pdf" || selected.type.startsWith("image/"))) {
			setFile(selected);
		} else {
			alert("Only PDF or Image files are allowed.");
		}
	};

	return (
		<div className="w-full max-w-3xl rounded-md border bg-white p-6">
			<h3 className="mb-6 border-b border-gray-200 pb-4 text-lg font-semibold">Company Details</h3>

			<div className="mb-6 flex flex-col gap-6 sm:flex-row">
				{/* GST Upload */}
				<div className="w-full sm:w-1/2">
					<label className="mb-2 block text-sm font-medium text-[#2873B9]">
						Upload GST Certificate (PDF)
						<span className="ml-1 text-red-500">*</span>
					</label>
					<div className="custom-dashed-border h-[110px] rounded-[12px] border-black px-2 pb-4 text-center text-sm text-gray-600">
						<div className="flex h-[100px] flex-col items-center  justify-center">
							<div className="flex justify-center">
								<Icon IconName="blackUploadFile" />
							</div>
							<p>
								Drag file here or <span className="cursor-pointer text-[#2873B9]">Browse</span>
							</p>
						</div>
					</div>
				</div>

				{/* PAN Upload */}
				<div className="w-full sm:w-1/2">
					<label className="mb-2 block text-sm font-medium text-[#2873B9]">
						Upload PAN (Image or PDF)
						<span className="ml-1 text-red-500">*</span>
					</label>
					<div
						className="custom-dashed-border relative rounded-[12px] border-black px-2 pb-4 text-center text-sm text-gray-600"
						onClick={() => fileInputRef.current?.click()}
					>
						<input
							type="file"
							accept="application/pdf,image/*"
							className="hidden"
							ref={fileInputRef}
							onChange={handleFileChange}
						/>
						<div className="flex min-h-[90px] flex-col items-center justify-center">
							{file ? (
								<div className="mt-2 flex items-center gap-2 text-sm">
									{file.type === "application/pdf" ? (
										<NextImage src={pdfImage} className="h-10 w-10" alt="Background Shape Bottom" />
									) : (
										<NextImage src={imageFile} className="h-10 w-10" alt="Background Shape Bottom" />
									)}
									<span className="max-w-[200px] truncate">{file.name}</span>
								</div>
							) : (
								<>
									<p className="absolute left-3 top-2 text-xs text-gray-400">Upload your PAN (max 2MB)</p>
									<div className="mt-6">
										<div className="flex justify-center">
											<Icon IconName="blackUploadFile" />
										</div>
										<p>
											Drag file here or{" "}
											<span className="cursor-pointer text-[#2873B9] underline">Browse</span>
										</p>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			<button className="mt-4 flex items-center gap-2 rounded-md bg-pink-500 px-5 py-2 text-sm font-semibold text-white">
				<Icon IconName="uploadFile" />
				Submit Application
			</button>
		</div>
	);
}

export default GstDocuments;
