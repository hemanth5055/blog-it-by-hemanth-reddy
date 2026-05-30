import React from "react";

import { Button, Input, Textarea } from "@bigbinary/neetoui";

export const Form = () => (
  <div className="flex h-full w-full flex-col gap-48 rounded-xl border-2 border-[#262626] p-10">
    <div className="flex w-full flex-col gap-5 ">
      <Input id="title" label="Title" placeholder="Enter title" size="large" />
      <Textarea
        className="text-white"
        id="description"
        label="Description"
        placeholder="Enter description"
        size="large"
      />
    </div>
    <div className="flex h-full w-full items-end justify-end gap-5">
      <Button
        className="bg-[#262626] text-white"
        label="Reset"
        style="primary"
      />
      <Button className="" label="Submit" style="primary" />
    </div>
  </div>
);
