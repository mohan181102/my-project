import React from "react";
import "./Postform.css";
import { useCallback } from "react";
import { appendErrors, useForm } from "react-hook-form";
import { Button, Select, Input } from "../index";
import RTE from "../RTE";
import authconfig from "../../Appwrite/Config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../store/postslice";
import authservice from "../../Appwrite/Auth";

function Postform({ post }) {
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
  const submit = async (data) => {
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
          userid: id.email,
        });

        if (dbpost) {
          document.getElementById("submitpop").style.display = "block";
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

  return (
    <form onSubmit={handleSubmit(submit)} className={`form flex flex-wrap `}>
      <div className={`w-2/3 px-2`}>
        <Input
          label="Title :"
          className="mb-4 title"
          {...register("title", {
            required: true,
          })}
        />

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

        <RTE
          label="Content: "
          name="conntent"
          
          control={control}
          defaultvalue={getValues("content")}
          {...register("conntent", { required: true })}
        />
      </div>

      <div className={`w-1/3 px-2`}>
        <Input
          label="Featured image :"
          type="file"
          name="featuredimg"
          className="mb-4 feimg"
          accept="image/png, image/jpg, image/jpeg image/gif"
          {...register("featuredimg", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={authconfig.getfile(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgcolor="primary"
          className={`bg-blue-500`}
          children={post ? "Update" : "Submit"}
        />

        <div id="submitpop">
          <p id="popupmsg">Post create</p>
        </div>
      </div>
    </form>
  );
}

export default Postform;
