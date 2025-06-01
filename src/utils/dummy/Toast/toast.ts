import type { ToasterProps } from "sonner";

export const successToastStyle: ToasterProps = {
  position: "top-center",
  style: {
    backgroundColor: "#228B22",
    color: "white",
    border: "none",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
  },
};

export const errorToastStyle: ToasterProps = {
  position: "top-center",
  style: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
  },
};
