import React from "react";
import { BlogDetailByAnima } from "./BlogDetailByAnima";
import { CommentsByAnima } from "./CommentsByAnima";
import { PostsByAnima } from "./PostsByAnima";
import { PostsWrapperByAnima } from "./PostsWrapperByAnima";
import { HeaderSection } from "@/app/sections/HeaderSection";

export const BlogDetailScreen = (): JSX.Element => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-white">
			<HeaderSection/>
			<BlogDetailByAnima />
			<CommentsByAnima />
			<div className="flex justify-center gap-6 px-4">
				<PostsByAnima />
				<PostsWrapperByAnima />
			</div>
		</div>
	);
};
