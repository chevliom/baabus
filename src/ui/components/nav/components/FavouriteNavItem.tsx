import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

const FavouriteIcon = ({ iconName }: { iconName: string }) => {
    if (iconName === 'favourite') {
        return (
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5003 18.7607L9.29199 17.6607C5.00033 13.769 2.16699 11.194 2.16699 8.05236C2.16699 5.47736 4.18366 3.46902 6.75033 3.46902C8.20033 3.46902 9.59199 4.14402 10.5003 5.20236C11.4087 4.14402 12.8003 3.46902 14.2503 3.46902C16.817 3.46902 18.8337 5.47736 18.8337 8.05236C18.8337 11.194 16.0003 13.769 11.7087 17.6607L10.5003 18.7607Z" fill="#E62875" />
            </svg>

        );
    }

    return null;
};



export async function FavouriteNavItem() {
    const { me: user } = await executeGraphQL(CurrentUserDocument, {
        cache: "no-cache",
    });

    if (!user) {
        return (
            <LinkWithChannel href="/favourite" className=" w-auto flex-shrink-0">
                <div className="p-2.5 border-2 border-dashed bg-[#F8BFD6] border-[#600B2E] rounded-full flex items-center justify-center">
                    <FavouriteIcon iconName="favourite" />
                </div>
                <span className="sr-only">Log in</span>
            </LinkWithChannel>
        );
    }
    return null
}
