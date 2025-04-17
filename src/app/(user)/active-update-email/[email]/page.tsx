
import ActiveUpdateEmailLogic from "@/app/(user)/active-update-email/[email]/active-update-email-logic";
import HomePage from "@/app/page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Active update email"
}

export default function ActiveUpdateEmailPage({ params }: any) {
    return (
        <div>
            <ActiveUpdateEmailLogic activeAccountEmail={params?.email}>
                <HomePage />
            </ActiveUpdateEmailLogic>
        </div>
    );
}
