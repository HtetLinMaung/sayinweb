import { useRouter } from "next/router";
import { useContext } from "react";
import { appContext } from "../providers/AppProvider";
import { disconnectSocket } from "../utils/socket";

export default function SideBar() {
  const [state, dispatch] = useContext(appContext);
  const router = useRouter();

  const isModuleExisted = (module) => {
    return state.modulepermissions.filter((mp) => mp.module.name == module)
      .length;
  };

  return (
    <nav
      className="md:w-20 fixed w-screen bottom-0 md:top-0 left-0 flex flex-col md:h-screen raised-rounded-card z-50 flex-shrink-0 overflow-auto"
      style={{ borderRadius: 0 }}
    >
      <div></div>
      <ul className="md:py-16 px-16 md:px-0 h-20 flex md:flex-col flex-grow">
        <li className="flex justify-center mr-10 md:mr-0 md:mb-10">
          <svg
            onClick={() => router.push("/sayinweb")}
            style={{
              width: "1.5rem",
              color: router.pathname == "/sayinweb" ? "#0285FF" : "#9A999B",
            }}
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chart-pie"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 544 512"
            className="svg-inline--fa fa-chart-pie fa-w-17 fa-3x cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"
              className="fa-primary"
            ></path>
          </svg>
        </li>
        {isModuleExisted("Category") ? (
          <li
            className="flex justify-center items-center mr-10 md:mr-0 md:mb-10"
            title="Category"
          >
            <svg
              onClick={() => router.push("/sayinweb/category")}
              style={{ width: "1.5rem" }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L6.5 11H17.5L12 2Z"
                fill={
                  router.pathname == "/sayinweb/category"
                    ? "#0285FF"
                    : "#9A999B"
                }
              />
              <path
                d="M17.5 22C19.9853 22 22 19.9853 22 17.5C22 15.0147 19.9853 13 17.5 13C15.0147 13 13 15.0147 13 17.5C13 19.9853 15.0147 22 17.5 22Z"
                fill={
                  router.pathname == "/sayinweb/category"
                    ? "#0285FF"
                    : "#9A999B"
                }
              />
              <path
                d="M3 13.5H11V21.5H3V13.5Z"
                fill={
                  router.pathname == "/sayinweb/category"
                    ? "#0285FF"
                    : "#9A999B"
                }
              />
            </svg>
          </li>
        ) : null}
        {isModuleExisted("Product") ? (
          <li
            className="flex justify-center mr-10 md:mr-0 md:mb-10"
            title="Product"
          >
            <svg
              onClick={() => router.push("/sayinweb/product")}
              style={{
                width: "1.5rem",
                color:
                  router.pathname == "/sayinweb/product"
                    ? "#0285FF"
                    : "#9A999B",
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="boxes"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="svg-inline--fa fa-boxes fa-w-18 fa-3x cursor-pointer"
            >
              <path
                fill="currentColor"
                d="M560 288h-80v96l-32-21.3-32 21.3v-96h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16zm-384-64h224c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16h-80v96l-32-21.3L256 96V0h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16z"
                className="fa-primary"
              ></path>
            </svg>
          </li>
        ) : null}

        {isModuleExisted("Invoice") ? (
          <li
            className="flex justify-center items-center mr-10 md:mr-0 md:mb-10"
            title="New Invoice"
          >
            <svg
              onClick={() => router.push("/sayinweb/new-invoice")}
              style={{
                width: "1.5rem",
              }}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 11V2H20C20.55 2 21.021 2.19567 21.413 2.587C21.8043 2.979 22 3.45 22 4V11H13ZM13 22V13H22V20C22 20.55 21.8043 21.021 21.413 21.413C21.021 21.8043 20.55 22 20 22H13ZM2 11V4C2 3.45 2.196 2.979 2.588 2.587C2.97933 2.19567 3.45 2 4 2H11V11H2ZM4 22C3.45 22 2.97933 21.8043 2.588 21.413C2.196 21.021 2 20.55 2 20V13H11V22H4Z"
                fill={
                  router.pathname == "/sayinweb/new-invoice"
                    ? "#0285FF"
                    : "#9A999B"
                }
              />
            </svg>
          </li>
        ) : null}
        {isModuleExisted("Invoice") ? (
          <li
            className="flex justify-center items-center mr-10 md:mr-0 md:mb-10"
            title="Invoice"
          >
            <svg
              onClick={() => router.push("/sayinweb/invoice")}
              style={{ width: "2rem" }}
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H12C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5V12H17V14C17 14.7956 16.6839 15.5587 16.1213 16.1213C15.5587 16.6839 14.7956 17 14 17H6C5.20435 17 4.44129 16.6839 3.87868 16.1213C3.31607 15.5587 3 14.7956 3 14V5ZM14 13V16C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V13H14ZM13 16V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H13ZM6 6.5C6 6.36739 6.05268 6.24021 6.14645 6.14645C6.24021 6.05268 6.36739 6 6.5 6H10.5C10.6326 6 10.7598 6.05268 10.8536 6.14645C10.9473 6.24021 11 6.36739 11 6.5C11 6.63261 10.9473 6.75979 10.8536 6.85355C10.7598 6.94732 10.6326 7 10.5 7H6.5C6.36739 7 6.24021 6.94732 6.14645 6.85355C6.05268 6.75979 6 6.63261 6 6.5ZM6 9.5C6 9.36739 6.05268 9.24021 6.14645 9.14645C6.24021 9.05268 6.36739 9 6.5 9H10.5C10.6326 9 10.7598 9.05268 10.8536 9.14645C10.9473 9.24021 11 9.36739 11 9.5C11 9.63261 10.9473 9.75979 10.8536 9.85355C10.7598 9.94732 10.6326 10 10.5 10H6.5C6.36739 10 6.24021 9.94732 6.14645 9.85355C6.05268 9.75979 6 9.63261 6 9.5ZM6 12.5C6 12.3674 6.05268 12.2402 6.14645 12.1464C6.24021 12.0527 6.36739 12 6.5 12H8.5C8.63261 12 8.75979 12.0527 8.85355 12.1464C8.94732 12.2402 9 12.3674 9 12.5C9 12.6326 8.94732 12.7598 8.85355 12.8536C8.75979 12.9473 8.63261 13 8.5 13H6.5C6.36739 13 6.24021 12.9473 6.14645 12.8536C6.05268 12.7598 6 12.6326 6 12.5Z"
                fill={
                  router.pathname == "/sayinweb/invoice" ? "#0285FF" : "#9A999B"
                }
              />
            </svg>

            {/* <svg
            onClick={() => router.push("/sayinweb/invoice")}
            style={{ width: "1.5rem" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
              stroke={
                router.pathname == "/sayinweb/invoice" ? "#0285FF" : "#9A999B"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 7H10M9 13H15M13 17H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z"
              stroke={
                router.pathname == "/sayinweb/invoice" ? "#0285FF" : "#9A999B"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
          </li>
        ) : null}
        {isModuleExisted("Sale") ? (
          <li
            className="flex justify-center items-center mr-10 md:mr-0 md:mb-10"
            title="Sale"
          >
            <svg
              onClick={() => router.push("/sayinweb/sale")}
              style={{ width: "2rem" }}
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V9.25L5 8.75V4C5 3.73478 5.10536 3.48043 5.29289 3.29289C5.48043 3.10536 5.73478 3 6 3H13C13.2652 3 13.5196 3.10536 13.7071 3.29289C13.8946 3.48043 14 3.73478 14 4V15H10.5V16H15C15.7956 16 16.5587 15.6839 17.1213 15.1213C17.6839 14.5587 18 13.7956 18 13V11H15V4C15 3.46957 14.7893 2.96086 14.4142 2.58579C14.0391 2.21071 13.5304 2 13 2H6ZM15 15V12H17V13C17 13.5304 16.7893 14.0391 16.4142 14.4142C16.0391 14.7893 15.5304 15 15 15ZM7.5 5C7.36739 5 7.24021 5.05268 7.14645 5.14645C7.05268 5.24021 7 5.36739 7 5.5C7 5.63261 7.05268 5.75979 7.14645 5.85355C7.24021 5.94732 7.36739 6 7.5 6H11.5C11.6326 6 11.7598 5.94732 11.8536 5.85355C11.9473 5.75979 12 5.63261 12 5.5C12 5.36739 11.9473 5.24021 11.8536 5.14645C11.7598 5.05268 11.6326 5 11.5 5H7.5ZM7 7.5C7 7.36739 7.05268 7.24021 7.14645 7.14645C7.24021 7.05268 7.36739 7 7.5 7H11.5C11.6326 7 11.7598 7.05268 11.8536 7.14645C11.9473 7.24021 12 7.36739 12 7.5C12 7.63261 11.9473 7.75979 11.8536 7.85355C11.7598 7.94732 11.6326 8 11.5 8H7.5C7.36739 8 7.24021 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5ZM1.5 15.882V12.118C1.5001 11.9323 1.55188 11.7504 1.64955 11.5925C1.74722 11.4346 1.88692 11.307 2.053 11.224L5.053 9.724C5.1918 9.65464 5.34484 9.61853 5.5 9.61853C5.65516 9.61853 5.8082 9.65464 5.947 9.724L8.947 11.224C9.11308 11.307 9.25278 11.4346 9.35045 11.5925C9.44812 11.7504 9.4999 11.9323 9.5 12.118V15.882C9.4999 16.0677 9.44812 16.2496 9.35045 16.4075C9.25278 16.5654 9.11308 16.693 8.947 16.776L5.947 18.276C5.8082 18.3454 5.65516 18.3815 5.5 18.3815C5.34484 18.3815 5.1918 18.3454 5.053 18.276L2.053 16.776C1.88692 16.693 1.74722 16.5654 1.64955 16.4075C1.55188 16.2496 1.5001 16.0677 1.5 15.882V15.882ZM2.54 12.306C2.48845 12.4281 2.48751 12.5657 2.53739 12.6886C2.58727 12.8114 2.68389 12.9094 2.806 12.961L5 13.887V16.5C5 16.6326 5.05268 16.7598 5.14645 16.8536C5.24021 16.9473 5.36739 17 5.5 17C5.63261 17 5.75979 16.9473 5.85355 16.8536C5.94732 16.7598 6 16.6326 6 16.5V13.887L8.194 12.961C8.31627 12.9094 8.41303 12.8114 8.46301 12.6884C8.51299 12.5655 8.51208 12.4278 8.4605 12.3055C8.40892 12.1832 8.31087 12.0865 8.18794 12.0365C8.06501 11.9865 7.92726 11.9874 7.805 12.039L5.5 13.013L3.194 12.039C3.13346 12.0135 3.0685 12.0002 3.00281 11.9998C2.93712 11.9994 2.87201 12.012 2.81118 12.0368C2.75035 12.0616 2.695 12.0981 2.6483 12.1443C2.6016 12.1905 2.56446 12.2454 2.539 12.306H2.54Z"
                fill={
                  router.pathname == "/sayinweb/sale" ? "#0285FF" : "#9A999B"
                }
              />
            </svg>
          </li>
        ) : null}

        <li className="flex-grow"></li>
        <li className="flex justify-center items-center" title="Logout">
          <svg
            onClick={() => {
              localStorage.setItem("token", "");
              disconnectSocket();
              router.push("/sayinweb/login");
            }}
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color:
                router.pathname == "/sayinweb/login" ? "#0285FF" : "#9A999B",
            }}
            width="1024"
            height="1024"
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M868 732H797.7C792.9 732 788.4 734.1 785.4 737.8C778.4 746.3 770.9 754.5 763 762.3C730.689 794.643 692.417 820.418 650.3 838.2C606.666 856.63 559.767 866.085 512.4 866C464.5 866 418.1 856.6 374.5 838.2C332.383 820.418 294.111 794.643 261.8 762.3C229.432 730.066 203.622 691.861 185.8 649.8C167.3 606.2 158 559.9 158 512C158 464.1 167.4 417.8 185.8 374.2C203.6 332.1 229.2 294.2 261.8 261.7C294.4 229.2 332.3 203.6 374.5 185.8C418.1 167.4 464.5 158 512.4 158C560.3 158 606.7 167.3 650.3 185.8C692.5 203.6 730.4 229.2 763 261.7C770.9 269.6 778.3 277.8 785.4 286.2C788.4 289.9 793 292 797.7 292H868C874.3 292 878.2 285 874.7 279.7C798 160.5 663.8 81.6 511.3 82C271.7 82.6 79.6 277.1 82 516.4C84.4 751.9 276.2 942 512.4 942C664.5 942 798.1 863.2 874.7 744.3C878.1 739 874.3 732 868 732ZM956.9 505.7L815 393.7C809.7 389.5 802 393.3 802 400V476H488C483.6 476 480 479.6 480 484V540C480 544.4 483.6 548 488 548H802V624C802 630.7 809.8 634.5 815 630.3L956.9 518.3C957.856 517.552 958.63 516.595 959.161 515.504C959.693 514.412 959.969 513.214 959.969 512C959.969 510.786 959.693 509.588 959.161 508.496C958.63 507.404 957.856 506.448 956.9 505.7V505.7Z"
              fill="#9A999B"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
}
