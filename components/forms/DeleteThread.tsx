"use client";

import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

import { useState, useEffect } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    // Ensure the overlay visibility is consistent between server and client
    setOverlayVisible(false);
  }, []);

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };
  
  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <div>
      <button className="cursor-pointer material-icons icon-small" onClick={toggleOverlay}>
        more_vert
      </button>
      {isOverlayVisible && (
        <div className="popup-overlay z-50">
          <div className="overlay-content flex flex-col bg-dark-2 rounded-2xl p-6 max-w-md gap-2">
              <div className="flex flex-row items-center">
                <h1 className="text-heading3-bold">Delete post?</h1>
                <button 
                    className='ml-auto material-icons cursor-pointer w-fit justify-center p-2 rounded-xl hover:bg-dark-3/30 bg-dark-3/10 transition-all text-light-1 flex flex-row items-center text-small-semibold gap-1'
                    onClick={toggleOverlay}>
                      close
                </button>
              </div>
              <div className="divider-h my-2"/>
              <p>This action is permanent and cannot be undone. Once you press delete, the post will be gone forever. </p>
              <div className="flex flex-row ml-auto mt-8 gap-2">
                <button 
                  className='cursor-pointer w-fit justify-center p-3 rounded-xl hover:bg-dark-3/20 transition-all text-primary-500 flex flex-row items-center text-small-semibold gap-1'
                  onClick={toggleOverlay}>
                    Cancel
                </button>
                <button 
                  className='cursor-pointer w-fit'
                  onClick={async () => {
                    await deleteThread(JSON.parse(threadId), pathname);
                    if (!parentId || !isComment) {
                      router.push("/");
                    }
                }}>
                  <span className="w-fit justify-center justify p-btn rounded-xl bg-primary-500 text-dark-1 flex flex-row items-center text-small-regular gap-1">
                    <span className="material-icons icon-small">
                      delete
                    </span>
                    Delete
                  </span>
                </button>
              </div>
            
          </div>
        </div>
      )}
    </div>

  );
}

export default DeleteThread;
