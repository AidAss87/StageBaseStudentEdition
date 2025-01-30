"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createPost, updatePost } from "@/app/[stage]/actions";
import { usePosts } from "@/store";
import { shallow } from "zustand/shallow";
import path from "path";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  stage: z.string().min(1, {
    message: "Select stage.",
  }),
  images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
              file.type
            ),
          "Only .jpg, .jpeg, .webp, and .png formats are supported"
        )
    )
    .optional(),
});

function editSrc(body: string, title: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, "text/html");
  const images = doc.querySelectorAll("img");
  images.forEach((img) => {
    const srcAttr = img.getAttribute("src") || "";
    if (!srcAttr.includes("http")) {
      const newAttr = path.join(
        `/assets/images/post/${title + srcAttr}`
          .replaceAll(" ", "_")
          .replaceAll("%20", "_")
      );
      console.log(srcAttr.split("/")[1]);
      img.setAttribute("src", newAttr);
    }
  });
  const articleElement = doc.querySelector("article");
  const newBody = articleElement?.innerHTML;
  return newBody || body;
}

export function NewPostForm({
  title = "",
  body = "",
  id = "",
  stage = "1",
}: {
  title: string;
  body: string;
  id: string;
  stage: string;
}) {
  const [posts, loading, getAllPosts] = usePosts(
    (state) => [state.posts, state.loading, state.getAllPosts],
    shallow
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      body: body || "",
      stage: stage || "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);

    formData.append("stage", values.stage);
    if (values.images) {
      console.log(values.images);
      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }
    if (id) {
      formData.append("id", id);
      formData.append("body", values.body);
    } else {
      const editSrcBody = editSrc(values.body, values.title);
      formData.append("body", editSrcBody);
    }
    id ? updatePost(formData) : createPost(formData);
    console.log(stage);
    getAllPosts(stage);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        action={id ? updatePost : createPost}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Создать новую тему</FormLabel>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Markdown</FormLabel>
              <FormControl>
                <div className="grid w-full gap-1.5">
                  <Textarea
                    {...field}
                    placeholder="Type markdown here."
                    id="message"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выбрать Stage</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Stages</SelectLabel>
                      <SelectItem value="1">Stage 1</SelectItem>
                      <SelectItem value="2">Stage 2</SelectItem>
                      <SelectItem value="3">Stage 3</SelectItem>
                      <SelectItem value="4">Stage 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Добавить картинку</FormLabel>
              <FormControl>
                <Input
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      field.onChange(Array.from(files));
                    }
                  }}
                  type="file"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {id && <input type="hidden" name="id" value={id} />}
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
}
