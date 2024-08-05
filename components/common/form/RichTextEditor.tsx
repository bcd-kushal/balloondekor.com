/* eslint-disable react-hooks/exhaustive-deps */

"use client";

//libraries
import { useEffect, useState } from "react";
import Image from "next/image";

//styles
import "./richTextEditor.css";

export default function RichTextEditor({
  defaultValue,
  onChange
}: {
  defaultValue: string;
  onChange: (value: string) => void;
}) {
  const [Component, setComponent] =
    useState<JSX.Element>();
  const [isFullscreen, setIsFullscreen] =
    useState<boolean>(false);

  const handleChange = (e: any, editor: any) => {
    const data = editor.getData();

    const transformed = (data as string)
      .replace(/h2/g, "h1")
      .replace(/h3/g, "h2")
      .replace(/h4/g, "h3");

    onChange(transformed);
  };

  useEffect(() => {
    async function loadModule() {
      const { default: ClassicEditor } =
        await import(
          "@ckeditor/ckeditor5-build-classic"
        );
      const { CKEditor } = await import(
        "@ckeditor/ckeditor5-react"
      );

      setComponent(
        <CKEditor
          editor={ClassicEditor}
          data={defaultValue}
          onChange={handleChange}
        />
      );
    }

    void loadModule();
  }, []);

  return (
    <div
      className={`ck_custom_container ${isFullscreen ? "ck_fullscreen" : ""}`}
    >
      <div
        className="ck_fullscreen_toggle"
        onClick={() =>
          setIsFullscreen(!isFullscreen)
        }
      >
        <Image
          src={`/icons/${isFullscreen ? "minimize" : "maximize"}-icon.svg`}
          alt="full screen image"
          height={15}
          width={15}
          unoptimized
        />
      </div>
      {Component}
    </div>
  );
}
