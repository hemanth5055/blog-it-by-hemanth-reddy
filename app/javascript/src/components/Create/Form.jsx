import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Input, Textarea } from "@bigbinary/neetoui/formik";

export const Form = () => (
  <div className="flex h-full w-full flex-col gap-48 rounded-xl border-2 border-[#262626] p-10">
    <div className="flex w-full flex-col gap-5 ">
      <Input
        id="title"
        label="Title"
        name="title"
        placeholder="Enter title"
        size="large"
      />
      <Textarea
        className="text-white"
        id="description"
        label="Description"
        name="description"
        placeholder="Enter description"
        size="large"
      />
    </div>
    <div className="flex h-full w-full items-end justify-end gap-5">
      <Button label="Reset" style="secondary" type="reset" />
      <Button label="Submit" style="primary" type="submit" />
    </div>
  </div>
);
