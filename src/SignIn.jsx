import React from "react";
import { CarConnectLogo } from "./src/Trans_CarConnect.png";

function SignIn() {
  return (
    <div className="h-screen flex items-center px-6 ">
      <img src={CarConnectLogo} alt="" />
      <form
        action=""
        className="flex flex-col items-center shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)]"
      >
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p>Empowering car rental companies with vehicle health monitoring</p>
        <div className="flex flex-col">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
