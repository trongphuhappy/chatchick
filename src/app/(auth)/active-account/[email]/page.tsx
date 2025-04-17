import HomePage from "@/app/page";
import { Metadata } from "next";
import ActiveAccountLogic from "@/app/(auth)/active-account/[email]/active-account-logic";

export const metadata: Metadata = {
    title: "Active account"
}

export default function ActiveAccountPage({ params }: any) {
    return (
        <div>
            <ActiveAccountLogic activeAccountEmail={params?.email}>
                <HomePage />
            </ActiveAccountLogic>
        </div>
    );
}
