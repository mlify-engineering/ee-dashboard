import React from "react";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
        marginLeft: "5%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/mapple-leaf.png`}
          alt="Canada Logo"
          style={{ marginRight: "15px", height: "50px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          <h1>
            Express Entry Visualizer - Overview of Canada&apos;s Immigration
            Rounds
          </h1>
          <p>
            {" "}
            Developed by <a href="https://mlify.ca">MLify Inc.</a>
          </p>
        </div>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/img/MLifyLogo.svg`}
        alt="Mlify Logo"
        style={{ height: "50px", marginRight: "5%" }}
      />
    </div>
  );
};

export default Header;
