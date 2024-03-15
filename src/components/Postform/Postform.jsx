import React, { useState } from "react";
import "./Postform.css";
import { useCallback } from "react";
import { appendErrors, useForm } from "react-hook-form";
import { Button, Select, Input } from "../index";
import authconfig from "../../Appwrite/Config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../store/postslice";
import authservice from "../../Appwrite/Auth";
import Toaster from "./Toaster";

function Postform({ post }) {
  const [showtoster, settoaster] = useState(false);
  const [loader, setloader] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: "active",
      },
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userdata);

  // CREATE SUBMIT FUNCTION

  const submit = async (data) => {
    setloader(true);
    console.log(data);
    if (post) {
      const file = data.image[0] ? authconfig.uploadfile(data.image[0]) : null;
      if (file) {
        authconfig.deletepost(post.featuredimg);
      }

      const dbpost = await authconfig.postupdate(post.$id, {
        ...data,
        featuredimage: file ? file.$id : "undifiend",
      });

      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
      setloader(false);
    } else {
      const elsefile = await authconfig.uploadfile(data.featuredimg[0]);
      const id = await authservice.getcurrentuser();
      if (elsefile) {
        const fileId = elsefile.$id;
        data.featuredimg = fileId;
        dispatch(Post(data));
        console.log(data);

        const dbpost = await authconfig.postcreate({
          ...data,
          conntent: "null",
          userid: id.email,
        });

        if (dbpost) {
          if (!showtoster) settoaster(true);
          setloader(false);
          setTimeout(() => {
            navigate(`/post/${dbpost.$id}`);
          }, 1000);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // CREATE UI

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`form sm:w-3/4 bg-white w-full min-h-fit rounded-md p-10 flex flex-wrap `}
    >
      {showtoster ? <Toaster information={"Succsefull upload!!"} /> : null}
      <h2
        className={`w-full h-10 text-3xl flex items-center justify-start mb-2 cursor-default font-bold text-gray-400 `}
      >
        Create your personal post
      </h2>
      <div className={`w-full h-auto px-2`}>
        {/* TITLE */}

        <Input
          label="Title :"
          className="mb-4 title hover:bg-gray-300"
          placeholder={"write title"}
          {...register("title", {
            required: true,
          })}
        />

        {/* SLUG */}

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 slug"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
      </div>

      {/* FEATURE IMAGE */}

      <div className={`w-1/3 px-2`}>
        <Input
          label="Featured image :"
          type="file"
          name="featuredimg"
          className="mb-4 feimg"
          accept="image/png, image/jpg, image/jpeg image/gif"
          {...register("featuredimg", { required: !post })}
        />

        {/* FEATURE IMG */}

        {post && (
          <div className="w-full mb-4">
            <img
              src={authconfig.getfile(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        {/* select */}

        <Select
          options={["active", "inactive"]}
          label="status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgcolor="primary"
          className={`bg-green-500 w-full text-white text-xl font-semibold  ${
            loader ? "bg-orange-300" : ""
          }`}
          children={post ? "Update" : loader ? "Uploading..." : "Submit"}
        />
      </div>
    </form>
  );
}

export default Postform;
