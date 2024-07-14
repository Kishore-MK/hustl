import React, { useEffect, useState } from "react";
import { checkConnection, retrievePublicKey } from "./freighter";
import { createUser } from "./contract";

const Header = ({setpubkey}) => {
  const [connect, getConnected] = useState("Connect");
  const [publickey, getPublicKey] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => setOpen(!open);

  useEffect(() => {
    if (publickey !== "") {
      getConnected("Connected!");
      setpubkey(publickey);
    }
  }, [publickey]);
  
  const connectWallet = async () => {
    if (await checkConnection()) {
      getPublicKey(await retrievePublicKey());
    }
  };

  return (
    <div className="bg-slate-400 flex md:flex-row shadow-slate-500 shadow-lg justify-between items-center px-10 py-4">
      <div className="text-2xl sm:text-
      3xl lg:text-3xl font-semibold text-black flex items-center gap-5">
        <span className="text"></span>
      </div>

      <div
        onClick={() => handleOpenMenu()}
        className="text-4xl absolute top-4 right-3 md:hidden cursor-pointer"
      >
        <ion-icon name={open ? "close" : "menu"}></ion-icon>
      </div>

      <div>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          HUSTL
        </Typography>
        <ul
          className={`${
            open ? "top-20 left-0" : "top-[-496px]"
          } flex flex-col md:flex-row md:justify-around items-center text-nowrap md:pb-0 py-3 absolute md:static bg-white md:bg-[transparent] gap-5 w-full md:w-auto pl-3 md:border-none border-2 border-blue-400 rounded-b-2xl transition-all duration-500 ease-in-out z-10`}
        >
          <div>
            <div className="p-1 bg-gray-50  border-2 max-w-max rounded-md">
              
              <span className="px-2">
                {`${publickey.substring(0, 4)} ${
                  publickey && "..."
                } ${publickey.substring(publickey.length - 4)}`}
              </span>
            </div>
          </div>
          
            <button
              className="text-xl w-52 hover:bg-blue-500 bg-blue-400 rounded-md p-4 font-bold text-white border-4"
              onClick={connectWallet}
            >
              {connect}
            </button>
            
          
        </ul>
        <IconButton edge="end" color="inherit">
        </IconButton>
      </Toolbar>
    </AppBar>
        
      </div>
    </div>
  );
};

export default Header;

/* Connect wallet function:

1. To enable connection between the wallet and the web application.
2. To get the public key of the connected wallet.
3. Signing the transaction.
*/