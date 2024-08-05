/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";

import { AdminDocument } from "@/schemas/cms/admin";
import {
  getAdmin,
  updateAdmin
} from "@/fetchAPIs/cms/admin";
import { ResponseDataType } from "@/types/cms/api";
import { useStatusContext } from "@/hooks/useStatusContext";
import Input from "@/components/common/form/Input";

export default function AdminPage() {
  const { addStatus } = useStatusContext();

  const [admin, setAdmin] =
    useState<AdminDocument | null>(null);
  const [newAdmin, setNewAdmin] =
    useState<AdminDocument | null>(null);

  const handleGetAdmin = () => {
    getAdmin()
      .then((res: ResponseDataType) => {
        setAdmin(res.data);
      })
      .catch((res: ResponseDataType) => {
        addStatus(res.status);
      });
  };

  const handleUpdateAdmin = () => {
    updateAdmin(newAdmin as AdminDocument)
      .then((res: ResponseDataType) => {
        setAdmin(res.data);
        addStatus(res.status);
      })
      .catch((res: ResponseDataType) => {
        addStatus(res.status);
      });
  };

  const handleReset = () => {
    setNewAdmin(admin);
  };

  useEffect(() => {
    handleGetAdmin();
  }, []);

  useEffect(() => {
    setNewAdmin(admin);
  }, [admin]);

  useEffect(() => {
    console.log(newAdmin);
  }, [newAdmin]);

  return (
    <main>
      <h2 className="text-[30px] pl-[10px]">
        Update Admin
      </h2>
      {newAdmin ? (
        <section className="p-[1rem]">
          <section className="flex flex-col items-center justify-start gap-[1rem]">
            <Input
              title="username"
              name="userName"
              isRequired={true}
              hasSubmitted={false}
              showError={false}
              errorMessage={
                "username is required"
              }
              variant="text"
              defaultValue={
                newAdmin?.userName || ""
              }
              resetValue={false}
              setValue={(userName: string) => {
                setNewAdmin(
                  (prevNewAdmin) =>
                    ({
                      ...prevNewAdmin,
                      userName
                    }) as AdminDocument
                );
              }}
            />
            <Input
              title="password"
              name="password"
              isRequired={true}
              hasSubmitted={false}
              showError={false}
              errorMessage={
                "password is required"
              }
              variant="text"
              defaultValue={
                newAdmin?.password || ""
              }
              resetValue={false}
              setValue={(password: string) => {
                setNewAdmin(
                  (prevNewAdmin) =>
                    ({
                      ...prevNewAdmin,
                      password
                    }) as AdminDocument
                );
              }}
            />
            <Input
              title="answer"
              name="answer"
              isRequired={true}
              hasSubmitted={false}
              showError={false}
              errorMessage={"answer is required"}
              variant="text"
              defaultValue={
                newAdmin?.answer || ""
              }
              resetValue={false}
              setValue={(answer: string) => {
                setNewAdmin(
                  (prevNewAdmin) =>
                    ({
                      ...prevNewAdmin,
                      answer
                    }) as AdminDocument
                );
              }}
            />
          </section>
          <section className="flex items-center justify-end gap-[1rem] w-full border-t-[20px]">
            <div
              className="min-w-[100px] px-[2rem] py-[5px] border-[2px] border-gray-500 rounded-[5px] text-[14px] font-[600] text-gray-700 text-center capitalize cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </div>
            <div
              className="min-w-[100px] px-[2rem] py-[5px] border-[2px] border-blue-600 rounded-[5px] text-[14px] font-[600] text-blue-700 text-center capitalize cursor-pointer"
              onClick={handleUpdateAdmin}
            >
              update
            </div>
          </section>
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
