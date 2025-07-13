import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd"; // Import Modal
import { ShareAltOutlined } from "@ant-design/icons";
import SharePopup from "./../../../views/booking-flow/book-shipment/quotes/ShareQuotePopup";

const QuotePageSharer = () => {
  const [showModal, setShowModal] = useState(false); // Create state to control modal visibility
  const [popupContent, setPopupContent] = useState(null); // Create state to hold popup content
  const [showComponent, setShowComponent] = useState(false);

  //   const devToolingStyle = {
  //     position: 'fixed',
  //     bottom: '11%',
  //     right: '10px',
  //     zIndex: 9999,
  //     transform: 'translateY(-50%)',
  //   };

  const renderPopoverContent = (data) => {
    setPopupContent(<SharePopup data={data} />);
    setShowModal(true); // Show the modal when rendering content
  };

  useEffect(() => {
    if (window.location.pathname.includes("book_shipment") || window.location.pathname.includes("booking")) {
      setShowComponent(true);
    }
  }, [window.location]);

  return (
    showComponent && (
      <div className="right-side-floating-share">
        <Button
          type="primary"
          shape="circle"
          icon={<ShareAltOutlined />}
          onClick={() => {
            const url = `${window.location.origin}${window.location.pathname}${window.location.search}`;
            renderPopoverContent({
              url: url,
              title: "Quote Page",
              emailSubject: "Quote Page",
              isPage: true,
            });
          }}
        />
        <Modal
          visible={showModal}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => {
            setShowModal(false); // Hide the modal when canceling
          }}>
          {popupContent} {/* Render the popup content inside the modal */}
        </Modal>
      </div>
    )
  );
};

export default QuotePageSharer;
