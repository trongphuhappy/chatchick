'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from "@/components/TextViewMore/TextViewMore.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface TextViewMoreProps {
    content: string;
    maxHeight?: number;
}

const TextViewMore: React.FC<TextViewMoreProps> = ({ content, maxHeight = 100 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkContentOverflow = () => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                const visibleHeight = contentRef.current.clientHeight;
                setShowButton(contentHeight > visibleHeight);
            }
        };
        checkContentOverflow();
    }, [content]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="content-container">
            <div
                ref={contentRef}
                className={cx("content", {
                    expanded: isExpanded
                })}
                style={{ maxHeight: isExpanded ? 'none' : `${maxHeight}px` }}
            >
                {content}
            </div>
            {showButton && <button className="view-more-btn text-base font-semibold" onClick={toggleExpand}>
                {isExpanded ? 'View Less' : 'View More'}
            </button>}
        </div>
    );
};

export default TextViewMore;
