import React, { forwardRef } from "react";
import { StudentRequestProps } from "../props/RequestProps.ts";

const AppliedRequest = forwardRef<HTMLDivElement, StudentRequestProps>(
  (
    { jobVacancy, jobApplyPK, notes, status, student, companyNote, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className="flex justify-between items-center py-8 border-b-[1px] border-gray-400 pr-8 cursor-pointer transition hover:bg-gray-200"
      >
        <div className="flex items-center">
          <div className="h-[100px] w-[200px] flex items-center justify-center">
            <img
              className="h-full object-cover object-center"
              src={jobVacancy.company.logoUrl}
            />
          </div>
          <div className="ml-6">
            <div className="text-xl font-semibold">
              {jobVacancy.jobPosition}
            </div>
            <div>at {jobVacancy.company.name}</div>
          </div>
        </div>

        <div>
          {status === "Waiting" ? (
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Waiting
            </span>
          ) : status === "Approved to Interview" ? (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
              Approved to Interview
            </span>
          ) : (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
              Rejected
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default AppliedRequest;
