import styles from "@/components/HomeSidebar/HomeSidebar.module.css";
import classNames from "classnames/bind";
import { Bookmark, House, MessageCircleMore, Users } from "lucide-react";

const cx = classNames.bind(styles);

const OPTIONS = [
    {
        icon: <House />,
        title: "Home"
    }, {
        icon: <MessageCircleMore />,
        title: "Messages"
    }, {
        icon: <Users />,
        title: "Friends"
    }, {
        icon: <Bookmark />,
        title: "Saved"
    },
]

export default function HomeSidebar() {

    const active = false;

    const renderOption = () => {
        return OPTIONS?.map((item, index) => {
            return <div key={index} className={cx("box", "hover:cursor-pointer hover:bg-blue-200", { "bg-active": active })}>
                <i className={cx("color", { "color-active": active })}>
                    {item.icon}
                </i>
                <span className={cx("color", "text", { "color-active": active })}>{item.title}</span>
            </div>
        })
    }

    return (
        <div className="flex flex-col gap-y-1 h-[calc(100vh-328px)]">
            {renderOption()}
        </div>
    )
}
