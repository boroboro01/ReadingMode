import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

function HorizontalList({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -240, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  };

  return (
    <div className="horizontal-wrapper">
      {/* 왼쪽 버튼 */}
      <button className="scroll-btn left" onClick={scrollLeft}>
        &lt;
      </button>

      {/* 오른쪽 버튼 */}
      <button className="scroll-btn right" onClick={scrollRight}>
        &gt;
      </button>

      {/* 스크롤 영역 */}
      <div ref={scrollRef} className="horizontal-scroll">
        {children}
      </div>
    </div>
  );
}

export default HorizontalList;
