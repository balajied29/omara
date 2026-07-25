import PageEffects from "@/components/PageEffects";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageEffects />
      {children}
    </>
  );
}
