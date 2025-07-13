import React from "react";
import { APP_NAME } from "configs/AppConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`} Developed by{" "}
        <a href="https://habibrahman.me">Habibur Rahman</a> with ❤️ in{" "}
        <a href="https://mlify.ca">MLify Innovations Inc. 🇨🇦 </a>
        <span className="font-weight-semibold"> | </span> All rights reserved.
      </span>
      <div>
        <a className="text-gray" href="https://mlify.ca/terms-and-conditions/">
          Terms & Conditions
        </a>
        <span className="mx-2 text-muted"> | </span>
        <a className="text-gray" href="https://mlify.ca/pages/privacy-policy/">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
