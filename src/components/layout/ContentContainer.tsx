type Props = {
  children: React.ReactNode;
};

function ContentContainer({ children }: Props) {
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "32px 20px",
      }}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
