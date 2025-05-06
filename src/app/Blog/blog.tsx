import React from "react";
// import { BarByAnima } from "./component/sections/BarByAnima";
import { HeaderSection } from "../sections/HeaderSection";
import { BlogDetailByAnima } from "./component/sections/BlogDetailByAnima";
import { CommentsByAnima } from "./component/sections/CommentsByAnima";
import { PostsByAnima } from "./component/sections/PostsByAnima";
import { PostsWrapperByAnima } from "./component/sections/PostsWrapperByAnima";

export const Blog = (): JSX.Element => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-white">
			<HeaderSection />
			<BlogDetailByAnima />
			<CommentsByAnima />
			<PostsByAnima />
			<PostsWrapperByAnima />
		</div>
	);
};
