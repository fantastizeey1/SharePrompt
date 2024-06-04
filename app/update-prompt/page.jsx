"use client";

<<<<<<< HEAD
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePromptContent = ({ promptId }) => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details");
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (promptId) {
      getPromptDetails();
    } else {
      setLoading(false);
    }
=======
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
>>>>>>> 7b2590c17d27c71a7d36c62c5df6a3b5ef281e80
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

<<<<<<< HEAD
    if (!post.prompt || !post.tag) {
      setIsSubmitting(false);
      return alert("Prompt and Tag are required");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
=======
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
>>>>>>> 7b2590c17d27c71a7d36c62c5df6a3b5ef281e80
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
<<<<<<< HEAD
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update prompt");
      }
    } catch (error) {
      alert(error.message);
=======
      }
    } catch (error) {
      console.log(error);
>>>>>>> 7b2590c17d27c71a7d36c62c5df6a3b5ef281e80
    } finally {
      setIsSubmitting(false);
    }
  };

<<<<<<< HEAD
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Form
      type="Edit"
=======
  return (
    <Form
      type='Edit'
>>>>>>> 7b2590c17d27c71a7d36c62c5df6a3b5ef281e80
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

<<<<<<< HEAD
const UpdatePrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptContent promptId={promptId} />
    </Suspense>
  );
};

=======
>>>>>>> 7b2590c17d27c71a7d36c62c5df6a3b5ef281e80
export default UpdatePrompt;
