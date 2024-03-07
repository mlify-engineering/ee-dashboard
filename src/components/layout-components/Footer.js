import React from 'react';
import { APP_NAME } from 'configs/AppConfig';

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span>{' '}
        All rights reserved.
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
