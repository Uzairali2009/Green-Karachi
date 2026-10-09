export default function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[15px]">{children}</table>
    </div>
  );
}
