import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchComponent() {

    const [valueSearch, setValueSearch] = useState("");

    const handleChangeValueSearch = (e: any) => {
        setValueSearch(e.target.value);
    }

    return (
        <div className={`w-full border-2 bg-[#f8f8f9] px-[18px] py-[5px] rounded-xl flex items-center gap-x-4 ${valueSearch !== "" && "border-gray-800"}`}>
            <i className={`text-gray-400 ${valueSearch !== "" && "text-gray-700"}`}><Search /></i>
            <input className="w-full outline-none border-none bg-transparent" type="text" placeholder="Search" value={valueSearch} onChange={handleChangeValueSearch} />
        </div>
    )
}
