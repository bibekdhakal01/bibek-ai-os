"use client";

import { useState, useEffect } from "react";
import { GithubStats } from "@/src/types/github";
import { getMockGithubStats } from "@/src/lib/github";

export const useGithub = () => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(getMockGithubStats());
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return { stats, isLoading };
};
