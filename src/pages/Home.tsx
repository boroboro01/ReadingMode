import MainLayout from "../components/layout/MainLayout";
import ContentContainer from "../components/layout/ContentContainer";
import HorizontalList from "../components/list/HorizontalList";
import VideoCard from "../components/card/VideoCard";

function Home() {
  return (
    <MainLayout>
      <ContentContainer>
        <h1 style={{ color: "#f9fafb" }}>어느 책이든 어울리는 잔잔한 재즈</h1>
      </ContentContainer>

      <div style={{ padding: "0 20px 32px" }}>
        <HorizontalList>
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </HorizontalList>
      </div>
    </MainLayout>
  );
}

export default Home;
