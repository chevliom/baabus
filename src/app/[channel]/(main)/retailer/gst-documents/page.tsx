"use client";

import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { z } from "zod";
import pdfImage from "../../../../../assets/retailerImage/pdf.png";
import imageFile from "../../../../../assets/retailerImage/imageFile.png";
import { registerAccount, uploadDocuments } from "@/lib/graphqlClient";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SpinnerProvider from "@/component/SpinnerProvider";

export const Icon = ({ IconName }: { IconName: string }) => {
    if (IconName == "uploadFile") {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.71 7.71087L11 5.41087V15.0009C11 15.2661 11.1054 15.5204 11.2929 15.708C11.4804 15.8955 11.7348 16.0009 12 16.0009C12.2652 16.0009 12.5196 15.8955 12.7071 15.708C12.8946 15.5204 13 15.2661 13 15.0009V5.41087L15.29 7.71087C15.383 7.8046 15.4936 7.879 15.6154 7.92976C15.7373 7.98053 15.868 8.00667 16 8.00667C16.132 8.00667 16.2627 7.98053 16.3846 7.92976C16.5064 7.879 16.617 7.8046 16.71 7.71087C16.8037 7.61791 16.8781 7.50731 16.9289 7.38545C16.9797 7.26359 17.0058 7.13288 17.0058 7.00087C17.0058 6.86886 16.9797 6.73816 16.9289 6.6163C16.8781 6.49444 16.8037 6.38384 16.71 6.29087L12.71 2.29087C12.6149 2.19983 12.5028 2.12847 12.38 2.08087C12.1365 1.98085 11.8635 1.98085 11.62 2.08087C11.4972 2.12847 11.3851 2.19983 11.29 2.29087L7.29 6.29087C7.19676 6.38411 7.1228 6.4948 7.07234 6.61662C7.02188 6.73845 6.99591 6.86901 6.99591 7.00087C6.99591 7.13273 7.02188 7.2633 7.07234 7.38512C7.1228 7.50694 7.19676 7.61763 7.29 7.71087C7.38324 7.80411 7.49393 7.87807 7.61575 7.92853C7.73757 7.97899 7.86814 8.00496 8 8.00496C8.13186 8.00496 8.26243 7.97899 8.38425 7.92853C8.50607 7.87807 8.61676 7.80411 8.71 7.71087ZM21 14.0009C20.7348 14.0009 20.4804 14.1062 20.2929 14.2938C20.1054 14.4813 20 14.7357 20 15.0009V19.0009C20 19.2661 19.8946 19.5204 19.7071 19.708C19.5196 19.8955 19.2652 20.0009 19 20.0009H5C4.73478 20.0009 4.48043 19.8955 4.29289 19.708C4.10536 19.5204 4 19.2661 4 19.0009V15.0009C4 14.7357 3.89464 14.4813 3.70711 14.2938C3.51957 14.1062 3.26522 14.0009 3 14.0009C2.73478 14.0009 2.48043 14.1062 2.29289 14.2938C2.10536 14.4813 2 14.7357 2 15.0009V19.0009C2 19.7965 2.31607 20.5596 2.87868 21.1222C3.44129 21.6848 4.20435 22.0009 5 22.0009H19C19.7956 22.0009 20.5587 21.6848 21.1213 21.1222C21.6839 20.5596 22 19.7965 22 19.0009V15.0009C22 14.7357 21.8946 14.4813 21.7071 14.2938C21.5196 14.1062 21.2652 14.0009 21 14.0009Z" fill="white" />
            </svg>

        )
    }

    if (IconName = "blackUploadFile") {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.4 9.9943H8.99V14.9943C8.99 15.5443 9.44 15.9943 9.99 15.9943H13.99C14.54 15.9943 14.99 15.5443 14.99 14.9943V9.9943H16.58C17.47 9.9943 17.92 8.9143 17.29 8.2843L12.7 3.6943C12.6075 3.6016 12.4976 3.52805 12.3766 3.47787C12.2557 3.42769 12.126 3.40186 11.995 3.40186C11.864 3.40186 11.7343 3.42769 11.6134 3.47787C11.4924 3.52805 11.3825 3.6016 11.29 3.6943L6.7 8.2843C6.07 8.9143 6.51 9.9943 7.4 9.9943ZM5 18.9943C5 19.5443 5.45 19.9943 6 19.9943H18C18.55 19.9943 19 19.5443 19 18.9943C19 18.4443 18.55 17.9943 18 17.9943H6C5.45 17.9943 5 18.4443 5 18.9943Z" fill="black" />
            </svg>

        )
    }
}

interface PersonalDetails {
    fullName: string;
    email: string;
    businessName: string;
    contact: string;
    password: string;
    channel: string;
}

interface CompanyDetails {
    gst: string;
    productCategories: string[];
    heardAboutUs: string[];
    purchaseFrequency: string[];
    communicationChannels: string[];
}

interface GraphQLError {
    message: string;
    path?: string[];
    code?: string;
    field?: string | null;
}


// Zod schema for file validation
const fileSchema = z
    .custom<File>((file) => file instanceof File, {
        message: "Please upload a valid file",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "File must be 2MB or smaller",
    })
    .refine(
        (file) =>
            ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
        {
            message: "Only PDF or image (jpg/png) files are allowed",
        }
    );

const formSchema = z.object({
    gstFile: fileSchema,
    panFile: fileSchema,
});

function GstDocuments() {
    const router = useRouter();
    const [gstFile, setGstFile] = useState<File | null>(null);
    const [panFile, setPanFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);


    const panInputRef = useRef<HTMLInputElement>(null);
    const gstInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleSubmit = async () => {
        const result = formSchema.safeParse({ gstFile, panFile });

        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.errors.forEach((err) => {
                const path = err.path[0] as string;
                fieldErrors[path] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setLoading(true);
        try {
            const personalDetailsRaw = localStorage.getItem("personalDetails");
            const companyDetailsRaw = localStorage.getItem("companyDetails");

            if (!personalDetailsRaw || !companyDetailsRaw) {
                toast.error("Missing details. Please complete all previous steps.");
                setLoading(false);
                return;
            }

            const personalDetails = JSON.parse(personalDetailsRaw) as PersonalDetails;
            const companyDetails = JSON.parse(companyDetailsRaw) as CompanyDetails;

            const [firstName, ...lastNameParts] = personalDetails.fullName.split(" ");
            const lastName = lastNameParts.join(" ");

            const registrationPayload = {
                email: personalDetails.email,
                password: personalDetails.password,
                firstName,
                lastName,
                channel: personalDetails.channel,
                metadata: [
                    { key: "channel", value: personalDetails.channel },
                    { key: "businessName", value: personalDetails.businessName },
                    { key: "contact", value: personalDetails.contact },
                    { key: "gst", value: companyDetails.gst },
                    { key: "productCategories", value: companyDetails.productCategories.join(", ") },
                    { key: "heardAboutUs", value: companyDetails.heardAboutUs.join(", ") },
                    { key: "purchaseFrequency", value: companyDetails.purchaseFrequency.join(", ") },
                    { key: "communicationChannels", value: companyDetails.communicationChannels.join(", ") },
                    { key: "web", value: "web" },
                ],
            };

            await registerAccount(registrationPayload);

            await uploadDocuments({
                gstFile: gstFile!,
                panFile: panFile!,
                email: personalDetails.email,
            });

            toast.success("Documents submitted and details saved!");
            router.push("/default-channel/getreferral");
            localStorage.removeItem("personalDetails");
            localStorage.removeItem("companyDetails");
            localStorage.removeItem("registrationPayload");
        } catch (error) {
            toast.error("Something went wrong during submission.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-md bg-white p-6 w-full max-w-3xl">

            <h3 className="text-lg font-semibold border-b border-gray-200 pb-4 mb-6">
                Company Details
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                {/* GST File Upload */}
                <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-[#2873B9] mb-2">
                        Upload GST Certificate (PDF)
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div
                        className="relative custom-dashed-border border-black rounded-[12px] pb-4 text-center text-sm text-gray-600 px-2 h-[110px] cursor-pointer"
                        onClick={() => gstInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            accept="application/pdf,image/*"
                            className="hidden"
                            ref={gstInputRef}
                            onChange={(e) => handleFileChange(e, setGstFile)}
                        />
                        <div className="flex flex-col justify-center items-center h-full">
                            {gstFile ? (
                                <div className="flex items-center gap-2">
                                    <NextImage
                                        src={gstFile.type === "application/pdf" ? pdfImage : imageFile}
                                        className="h-10 w-10"
                                        alt="File preview"
                                    />
                                    <span className="truncate max-w-[180px]">{gstFile.name}</span>
                                </div>
                            ) : (
                                <>
                                    <Icon IconName="blackUploadFile" />
                                    <p>Click to upload</p>
                                </>
                            )}
                        </div>
                    </div>
                    {errors.gstFile && <p className="text-sm text-red-500 mt-1">{errors.gstFile}</p>}
                </div>

                {/* PAN File Upload */}
                <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-[#2873B9] mb-2">
                        Upload PAN (Image or PDF)
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div
                        className="relative custom-dashed-border border-black rounded-[12px] pb-4 text-center text-sm text-gray-600 px-2 h-[110px] cursor-pointer"
                        onClick={() => panInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            accept="application/pdf,image/*"
                            className="hidden"
                            ref={panInputRef}
                            onChange={(e) => handleFileChange(e, setPanFile)}
                        />
                        <div className="flex flex-col justify-center items-center h-full">
                            {panFile ? (
                                <div className="flex items-center gap-2">
                                    <NextImage
                                        src={panFile.type === "application/pdf" ? pdfImage : imageFile}
                                        className="h-10 w-10"
                                        alt="File preview"
                                    />
                                    <span className="truncate max-w-[180px]">{panFile.name}</span>
                                </div>
                            ) : (
                                <>
                                    <Icon IconName="blackUploadFile" />
                                    <p>Click to upload</p>
                                </>
                            )}
                        </div>
                    </div>
                    {errors.panFile && <p className="text-sm text-red-500 mt-1">{errors.panFile}</p>}
                </div>
            </div>

            <div className="relative w-fit">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-pink-500 text-white rounded-md px-5 py-2 text-sm font-semibold mt-4 flex items-center justify-center gap-2 w-full"
                >
                    <Icon IconName="uploadFile" />
                    Submit Application
                </button>

                {loading && (
                    <div className="mt-2 flex justify-center">
                        <SpinnerProvider />
                    </div>
                )}
            </div>



        </div>
    );
}

export default GstDocuments;
