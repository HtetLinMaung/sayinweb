import BreadCrumb from "../../components/BreadCrumb";

export default function Home() {
  return (
    <div className="p-10" style={{ marginLeft: 68 }}>
      <div className="mb-5">
        <BreadCrumb
          items={[
            {
              label: "Dashboard",
              to: "/sayinweb",
            },
          ]}
        />
      </div>
    </div>
  );
}
