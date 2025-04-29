import { UserMenu } from "./UserMenu";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

const UserIcon = ({ iconName }: { iconName: string }) => {
	if (iconName === 'user') {
		return (
			<svg className="shrink-0" aria-hidden="true" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12.5 10.469C14.7091 10.469 16.5 8.67816 16.5 6.46902C16.5 4.25989 14.7091 2.46902 12.5 2.46902C10.2909 2.46902 8.5 4.25989 8.5 6.46902C8.5 8.67816 10.2909 10.469 12.5 10.469Z" fill="#E62875" />
				<path d="M20.5 17.969C20.5 20.454 20.5 22.469 12.5 22.469C4.5 22.469 4.5 20.454 4.5 17.969C4.5 15.484 8.082 13.469 12.5 13.469C16.918 13.469 20.5 15.484 20.5 17.969Z" fill="#E62875" />
			</svg>
		);
	}

	return null;
};



export async function UserMenuContainer() {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});

	if (user) {
		return <UserMenu user={user} />;
	} else {
		return (
			<LinkWithChannel href="/login" className=" w-auto flex-shrink-0">
				<div className="p-2 border-2 border-dashed bg-[#FAFEAB] border-[#600B2E] rounded-full flex items-center justify-center">
					<UserIcon iconName="user" />
				</div>
				<span className="sr-only">Log in</span>
			</LinkWithChannel>
		);
	}
}
