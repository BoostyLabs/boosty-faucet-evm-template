import { useState } from "react";
import { FormEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import BgGrid from "./BgGrid";

export default function Faucet() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [hcaptchaToken, setHcaptchaToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerificationSuccess = async (token: string, ekey: string) => {
    // set hcaptcha token
    setHcaptchaToken(token);
    // enable submit button
    setIsDisabled(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // disable submit button
    setIsDisabled(true);
    // send request to faucet
    const response = await fetch("/api/faucet", {
      method: "POST",
      body: JSON.stringify({ address: event.currentTarget.address.value, hcaptchaToken }),
    });
    // parse response
    const data = await response.json();
    // if error
    if (response.status != 200) return setErrorMessage(data.message);
    // success!
    setSuccessMessage(data.message);
  };

  return (
    <>
    <div className="h-screen w-screen bg-[#F9FAF9] p-4 md:p-12 overflow-hidden relative flex flex-col">
      <div className="z-40 flex justify-center  flex-1">
        <div className="w-full max-w-[554px]">
          <div className="pb-[60px]">
            <img className="mx-auto h-12 w-auto" src="logo.svg" alt="Testnet Faucet" />
          </div>
          <form className="space-y-4 bg-white p-6 rounded-lg shadow-[0px_1px_8px_0px_rgba(12,12,13,0.05),_0px_1px_4px_0px_rgba(0,0,0,0.05)]" onSubmit={handleSubmit}>
              <div>
                <div className="mb-3 text-[#07130C] font-semibold">
                  Get test tokens
                </div>
                <div className="text-sm text-[#989898]">Every 1 hour, NEX Testnet tokens can be claimed.</div>
              </div>
              <input id="address" name="address" type="string" required className="relative block w-full appearance-none rounded-lg border border-[#E8E8E8] px-4 py-[14px] text-[#07130C] placeholder:text-[#989898] placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm" placeholder="Enter your Nex smart chain testnet address" />
            <div>
              <div className="flex justify-center pb-4 empty:pb-0">
                <HCaptcha sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string} onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)} />
              </div>
              <div>
                <button
                  disabled={isDisabled}
                  type="submit"
                  className="disabled:bg-[#E1E3E2] disabled:text-[#C1C2C1] group relative flex w-full justify-center rounded-lg bg-[#07130C] p-4 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#49FF86] focus:ring-offset-2"
                >
                  NEX
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <img className="z-40 ml-auto h-[274px] w-auto" src="testnet-rubiks.svg" alt="Testnet rubik" />
      <BgGrid/>
      </div>
      <SuccessModal message={successMessage} />
      <ErrorModal message={errorMessage} />
    </>
  );
}
