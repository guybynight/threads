"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TextareaAutosize from 'react-textarea-autosize';


import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  username: string;
  imgUrl: string;
  name: string;
}

function PostThread({ userId, username, imgUrl, name}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <div className="flex flex-row gap-2 items-center">
                <div className='relative h-10 w-10 object-cover'>
                  <Image
                    src={imgUrl}
                    alt='logo'
                    fill
                    className='rounded-full object-cover border'
                  />
                </div>
                <div className="mb-1 flex flex-col">
                  <p className="text-body-medium">{name}</p>
                  <p className="text-small-medium text-dark-3">@{username}</p>
                </div>
              </div>
              {/* <FormLabel className='text-base-semibold text-light-2'>
                post content
              </FormLabel> */}
              <div className="flex-grow overflow-scroll">
                <FormControl placeholder="Start typing..." className='p-0 no-focus border-0 bg-dark-1 text-light-1'>
                  <TextareaAutosize className="text-heading4-medium resize-none focus:outline-none focus:border-none" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500 rounded-2xl p-btn'>
          Post
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
