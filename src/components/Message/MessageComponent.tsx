import styles from "@/components/Message/Message.module.css";
import ViewTheseFriendMessaged from "@/components/Message/ViewTheseFriendMessaged";
import TippyHeadless from "@tippyjs/react/headless";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";


export default function MessageComponent() {

    const [popupMessage, setPopupMessage] = useState<boolean>(false);

    const handleTogglePopupMessage = () => {
        setPopupMessage(prev => !prev);
    }

    const handleClosePopupMessage = () => {
        setPopupMessage(false)
    }



    return (
        <TippyHeadless
            interactive
            placement="bottom-start"
            offset={[90, 3]}
            visible={popupMessage}
            render={(attrs) => (
                <div {...attrs}>
                    <div className="w-[350px] max-h-[calc(min((100vh-96px)-60px),734px)] min-h-[30px] py-2 rounded-md shadow-avatar-shadown bg-white">
                        <div className="py-2">
                            <h3 className="px-3 text-xl font-bold">
                                Message
                            </h3>
                            <div className={`h-[80vh] overflow-y-auto ${styles.notification}`}>
                                <div>
                                    {popupMessage && <ViewTheseFriendMessaged onClose={handleClosePopupMessage} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            onClickOutside={handleClosePopupMessage}
        >
            <div className="group h-max inline-flex items-center py-2 px-3 bg-blue-100 rounded-lg select-none cursor-pointer hover:bg-blue-300" onClick={handleTogglePopupMessage}>
                <MessageCircleMore className="text-gray-500 group-hover:text-gray-800" />
            </div>
        </TippyHeadless >
    )
}
