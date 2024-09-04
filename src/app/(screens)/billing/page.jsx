import React from "react";
import "./style.css";
import { Divider } from "antd";
const TrialCard = () => {
  return (
    <div className="flex flex-col p-4 bg-gray-200 gap-4 rounded-xl justify-between">
      <p className="text-2xl font-semibold">Trial</p>
      <Divider className="my-0" />
      <div className="self-end">
        <button className="dark-btn w-[120px]">Select Plan</button>
      </div>
    </div>
  );
};
const BillingInfoCard = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-200 gap-4 rounded-md justify-between">
      <p className="text-2xl font-semibold">Billing Info</p>
      <Divider className="my-0" />
      <span>Payment method Connect ↗</span>
      <span>
        a WhatsApp Business number︎ on the Home tab to add payment method.{" "}
      </span>
      <Divider className="my-0" />
      <div className="self-end">
        <button className="dark-btn w-[120px]">Select Plan</button>
      </div>
    </div>
  );
};
const InvoicesCard = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-200 gap-2 rounded-md">
      <p className="text-2xl font-semibold">Invoices</p>
      <p className="text-md font-medium">
        Invoices will appear here once you upgrade to a paid plan
      </p>
    </div>
  );
};
const page = () => {
  return (
    <div className="w-full max-w-[800px] m-auto p-4">
      <div class="parent">
        <div class="div1 h-full">
          <TrialCard />
        </div>
        <div class="div2 h-full">
          <BillingInfoCard />{" "}
        </div>
        <div class="div3 h-full">
          <InvoicesCard />{" "}
        </div>
      </div>
    </div>
  );
};

export default page;
