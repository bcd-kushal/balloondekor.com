/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import Image from "next/image";

// hooks
import { useImageManagementContext } from "@/hooks/useImageManagementContext";

// components
import Status from "@/components/common/status/Status";
import Editor from "./Editor";
import Input from "@/components/common/form/Input";
import Button from "@/components/common/Button";
import Folder from "./Folder";

// types
import { FolderDocument } from "@/schemas/cms/folder";

// styles
import styles from "./folders.module.css";
import {
  NewFolderSVG,
  SortAZSVG
} from "@/constants/svgs/svg";

export default function Folders() {
  const {
    folder: { folders, load }
  } = useImageManagementContext();

  const [results, setResults] = useState<
    FolderDocument[]
  >([]);
  const [ascendingOrder, setAscendingOrder] =
    useState<boolean>(true);
  const [keyword, setKeyword] =
    useState<string>("");

  const [addFolder, setAddFolder] =
    useState<boolean>(false);
  const [editFolderId, setEditFolderId] =
    useState<number>(NaN);

  const searchHandler = () => {
    const results: FolderDocument[] = folders.val
      .filter(({ label }) =>
        label
          .toLowerCase()
          .includes(keyword.toLowerCase())
      )
      .sort((a, b) => {
        if (
          a.label.toLowerCase() <
          b.label.toLowerCase()
        ) {
          return ascendingOrder ? -1 : 1;
        }
        if (
          a.label.toLowerCase() >
          b.label.toLowerCase()
        ) {
          return ascendingOrder ? 1 : -1;
        }
        return 0;
      });

    setResults(results);
  };

  const editHandler = (id: number) => {
    setEditFolderId(id);
  };

  useEffect(() => {
    if (!addFolder) {
      load();
    }
  }, [addFolder]);

  useEffect(() => {
    if (!editFolderId) {
      load();
    }
  }, [editFolderId]);

  useEffect(() => {
    searchHandler();
  }, [folders, ascendingOrder, keyword]);

  return (
    <div
      className={`max-w-[290px] w-[290px] relative flex flex-col items-stretch justify-start h-full overflow-y-scroll scrollbar-hide border-r-[1.5px] border-[#12122120] bg-card-primary`}
    >
      {addFolder ? (
        <Editor
          variant="add"
          onClose={() => setAddFolder(false)}
        />
      ) : (
        <></>
      )}
      {editFolderId ? (
        <Editor
          variant="edit"
          defaultValue={
            folders.val.find(
              ({ _id }) => _id === editFolderId
            ) as FolderDocument
          }
          onClose={() => setEditFolderId(NaN)}
        />
      ) : (
        <></>
      )}
      <div
        className={`p-[16px] pb-[4px] sticky top-0 bg-card-primary z-10`}
      >
        <Input
          title=""
          name="folderSearch"
          isRequired={false}
          hasSubmitted={false}
          showError={false}
          errorMessage=""
          variant="search"
          placeholder="Search folders"
          defaultValue=""
          resetValue={false}
          setValue={setKeyword}
        />
      </div>
      <div className={`px-[16px]`}>
        <div className="flex items-center justify-stretch gap-[8px] my-[4px] *:w-1/2 *:rounded-lg *:bg-[#41414115] *:p-[8px] *:text-[14px] *:flex *:items-center *:justify-center *:gap-[8px] *:duration-300 *:transition-colors">
          <div
            className="cursor-pointer hover:bg-[#12121232]"
            onClick={() => setAddFolder(true)}
          >
            <NewFolderSVG dimensions={15} /> New
          </div>
          <div
            className="cursor-pointer hover:bg-[#12121232]"
            onClick={() =>
              setAscendingOrder(
                (prevState) => !prevState
              )
            }
          >
            <SortAZSVG dimensions={15} /> Sort
          </div>
        </div>

        {/* all folders ------------------------------ */}
        <div
          className={`grid grid-cols-2 gap-[4px] items-start justify-stretch mt-[12px] mb-[32px]`}
        >
          {results.map((folder) => (
            <Folder
              key={folder._id}
              folder={folder}
              onEdit={editHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
